"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const formatters_1 = require("./formatters");
const ledPrinterUtils_1 = __importDefault(require("./ledPrinterUtils"));
const print = (data) => {
    const senseLed = require('sense-hat-led');
    const textColor = [250, 250, 250];
    const bgColor = [20, 20, 20];
    return new Promise((resolve, reject) => {
        const cb = (err) => {
            if (!err) {
                resolve();
            }
            else {
                console.error(err);
                reject(err);
            }
        };
        const orientation = ledPrinterUtils_1.default(data.fusionPose);
        senseLed.sync.setRotation(orientation, false);
        senseLed.showMessage(formatters_1.temperatureFormatter(data.temperature), 0.1, bgColor, textColor, cb);
    });
};
const clear = () => {
    const senseLed = require('sense-hat-led');
    senseLed.sync.clear();
};
exports.default = { print, clear };
//# sourceMappingURL=LedPrinter.js.map