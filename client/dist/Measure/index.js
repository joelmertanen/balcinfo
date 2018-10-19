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
const Measure_1 = __importDefault(require("./Measure"));
const ConsolePrinter_1 = __importDefault(require("./ConsolePrinter"));
const RedisPersister_1 = require("../RedisPersister");
const command_line_args_1 = __importDefault(require("command-line-args"));
const Ruuvitag_1 = require("./Ruuvitag");
const cmdLineOptionDefinitions = [
    { name: 'fakeMeasure', type: Boolean },
    { name: 'noRuuvi', type: Boolean }
];
const cmdLineOptions = command_line_args_1.default(cmdLineOptionDefinitions);
const getRuuviData = () => __awaiter(this, void 0, void 0, function* () {
    const ruuviInstance = yield Ruuvitag_1.findTag('fac2a9cfdb55');
    return yield Ruuvitag_1.getRuuviResult(ruuviInstance);
});
const storeMeasurement = () => __awaiter(this, void 0, void 0, function* () {
    const measure = cmdLineOptions.noRuuvi ? Measure_1.default : getRuuviData;
    try {
        const measurement = yield getRuuviData();
        ConsolePrinter_1.default(measurement);
        yield RedisPersister_1.persistReadingData(measurement);
    }
    catch (e) {
        console.error(`error: ${e}`);
        process.exit(1);
    }
    RedisPersister_1.closeConnection();
    process.exit(0);
});
storeMeasurement();
//# sourceMappingURL=index.js.map