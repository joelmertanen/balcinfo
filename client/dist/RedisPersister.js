"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("../config.json"));
const { promisify } = require('util');
const redis = require('redis');
const client = redis.createClient();
const lpush = promisify(client.lpush).bind(client);
const lpop = promisify(client.lpop).bind(client);
const set = promisify(client.set).bind(client);
const get = promisify(client.get).bind(client);
;
function getResults() {
    return __awaiter(this, void 0, void 0, function* () {
        let results = [];
        let result;
        while (result = yield lpop(config_json_1.default.queueName)) {
            console.log('found result: ', result);
            results.push(result);
        }
        return results.map(result => JSON.parse(result));
    });
}
exports.getResults = getResults;
;
function persistReadingData(result) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            timestamp: result.timestamp,
            temperature: result.temperature.toFixed(2),
            humidity: result.humidity.toFixed(2)
        };
        yield lpush(config_json_1.default.queueName, JSON.stringify(data));
        yield set(config_json_1.default.latestKeyName, JSON.stringify(data));
    });
}
exports.persistReadingData = persistReadingData;
;
function getLatest() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield get(config_json_1.default.latestKeyName);
            return JSON.parse(result);
        }
        catch (e) {
            console.error(e);
        }
    });
}
exports.getLatest = getLatest;
function persistResults(results) {
    return __awaiter(this, void 0, void 0, function* () {
        results.forEach((result) => __awaiter(this, void 0, void 0, function* () {
            yield lpush(config_json_1.default.queueName, JSON.stringify(result));
        }));
    });
}
exports.persistResults = persistResults;
const closeConnection = () => {
    client.quit();
};
exports.closeConnection = closeConnection;
//# sourceMappingURL=RedisPersister.js.map