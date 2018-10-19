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
const LedPrinter_1 = __importDefault(require("./LedPrinter"));
const Measure_1 = __importDefault(require("../Measure/Measure"));
const RedisPersister_1 = require("../RedisPersister");
process.on('exit', function () {
    LedPrinter_1.default.clear();
});
const storeMeasurement = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const latestMeasurement = yield RedisPersister_1.getLatest();
        if (latestMeasurement) {
            const deviceData = yield Measure_1.default();
            yield LedPrinter_1.default.print(latestMeasurement, deviceData);
        }
    }
    catch (e) {
        console.error(`error: ${e}`);
        process.exit(1);
    }
    process.exit(0);
});
storeMeasurement();
//# sourceMappingURL=index.js.map