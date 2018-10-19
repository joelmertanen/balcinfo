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
const request_promise_1 = __importDefault(require("request-promise"));
const config_json_1 = __importDefault(require("../../config.json"));
const options = {
    uri: config_json_1.default.uri,
    method: 'POST',
    json: true
};
const sendResults = (results) => __awaiter(this, void 0, void 0, function* () {
    results.forEach((result) => __awaiter(this, void 0, void 0, function* () {
        const payload = {
            key: config_json_1.default.apiKey,
            timestamp: result.timestamp,
            temperature: result.temperature,
            humidity: result.humidity
        };
        const request = Object.assign({}, options, { body: payload });
        try {
            yield request_promise_1.default(request);
        }
        catch (e) {
            console.error('Failed to persist: ', e);
            throw new Error('failed to persist results');
        }
    }));
});
exports.default = sendResults;
//# sourceMappingURL=ResultsPersisterWeb.js.map