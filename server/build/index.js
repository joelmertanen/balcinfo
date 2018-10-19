"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg = require("pg");
const connectionName = process.env.INSTANCE_CONNECTION_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const allowedKey = process.env.API_KEY;
const pool = new pg.Pool({
    max: 1,
    host: '/cloudsql/' + connectionName,
    user: dbUser,
    password: dbPass,
    database: dbName
});
function isUndefined(value) {
    return value === undefined;
}
function writeNewRecord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // validate by parsing
        const timestamp = (new Date(req.body.timestamp)).toISOString();
        const temperature = Number.isFinite(parseInt(req.body.temperature, 10)) ? parseInt(req.body.temperature, 10) : undefined;
        const humidity = Number.isFinite(parseInt(req.body.humidity)) ? parseInt(req.body.humidity) : undefined;
        if (!timestamp ||
            isUndefined(temperature) ||
            isUndefined(humidity)) {
            console.error('incorrect payload: ', timestamp, temperature, humidity);
            res.status(500).send({ error: 'Internal server error' });
            return;
        }
        const query = 'INSERT INTO measurements (timestamp, temperature, humidity) VALUES ($1, $2, $3)';
        yield pool.query(query, [timestamp, temperature, humidity]);
        return res.status(200).send();
    });
}
exports.recordTemperature = (req, res) => __awaiter(this, void 0, void 0, function* () {
    switch (req.method) {
        case 'POST':
            if (req.body.key !== allowedKey) {
                console.error('missing API key: ', req.body);
                yield res.status(500).send({ error: 'Something blew up!' });
                return;
            }
            yield writeNewRecord(req, res);
            break;
        default:
            yield res.status(500).send({ error: 'Something blew up!' });
            break;
    }
});
//# sourceMappingURL=index.js.map