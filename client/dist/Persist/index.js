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
const RedisPersister_1 = require("../RedisPersister");
const ResultsPersisterWeb_1 = __importDefault(require("./ResultsPersisterWeb"));
function persist() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Starting reading of the results`);
        const results = yield RedisPersister_1.getResults();
        console.log(`Found ${results.length} results from DB`);
        if (!results) {
            return;
        }
        try {
            ResultsPersisterWeb_1.default(results);
            console.log(`Successfully stored the results to web`);
        }
        catch (e) {
            // network failure, re-persist
            // We expect the whole batch to be failed, which ain't perfect
            // However, I'm storing temperature data which has a timestamp, so whatever :)
            yield RedisPersister_1.persistResults(results);
        }
        RedisPersister_1.closeConnection();
    });
}
persist();
//# sourceMappingURL=index.js.map