"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_ruuvitag_1 = __importDefault(require("node-ruuvitag"));
exports.findTag = (tagId) => {
    return new Promise((resolve) => {
        node_ruuvitag_1.default.on('found', (tag) => {
            if (tag.id === tagId) {
                resolve(tag);
            }
        });
    });
};
exports.getRuuviResult = (tag) => {
    return new Promise((resolve) => {
        tag.on('updated', (data) => {
            const measurement = {
                timestamp: (new Date()).toJSON(),
                temperature: data.temperature,
                humidity: data.humidity
            };
            resolve(measurement);
        });
    });
};
//# sourceMappingURL=Ruuvitag.js.map