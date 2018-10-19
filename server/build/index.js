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
const kms_1 = require("@google-cloud/kms");
const pg = require("pg");
let secrets;
const getSecrets = () => __awaiter(this, void 0, void 0, function* () {
    if (secrets) {
        return secrets;
    }
    const kmsClient = new kms_1.default.v1.KeyManagementServiceClient();
    var request = {
        name: process.env.CRYPTO_KEY_PATH,
        ciphertext: process.env.ENCRYPTED_ENV,
    };
    try {
        console.log(request);
        const responses = yield kmsClient.decrypt(request);
        console.log('response: ', responses);
        const secrets_buf = Buffer.from(responses[0].plaintext).toString();
        console.log('ok so here after buffer from', secrets_buf);
        secrets = JSON.parse(secrets_buf);
        console.log('blaah: ', secrets);
        return secrets;
    }
    catch (e) {
        console.error(e);
        return {};
    }
});
// populate
getSecrets();
let pgPool;
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
        yield pgPool.query(query, [timestamp, temperature, humidity]);
        return res.status(200).send();
    });
}
exports.recordTemperature = (req, res) => __awaiter(this, void 0, void 0, function* () {
    // the secrets might not have been loaded yet. #onlyinhobbyprojects :))
    if (!secrets || !secrets['API_KEY']) {
        console.error('Could not find the secrets');
        yield res.status(500).send({ error: 'Internal server error' });
        return;
    }
    if (!pgPool) {
        const connectionName = secrets['INSTANCE_CONNECTION_NAME'];
        const dbUser = secrets['DB_USER'];
        const dbPass = secrets['DB_PASSWORD'];
        const dbName = secrets['DB_NAME'];
        pgPool = new pg.Pool({
            max: 1,
            host: '/cloudsql/' + connectionName,
            user: dbUser,
            password: dbPass,
            database: dbName
        });
    }
    switch (req.method) {
        case 'POST':
            const allowedKey = secrets['API_KEY'];
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