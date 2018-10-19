"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../types/enums");
const getScreenOrientation = (orientation) => {
    const quarter = Math.PI / 2;
    // if up or down
    if (Math.abs(orientation.y) <= quarter / 2) {
        if (orientation.x > 0) {
            return enums_1.ScreenOrientation.Up;
        }
        else {
            return enums_1.ScreenOrientation.Down;
        }
    }
    else {
        if (orientation.y > 0) {
            return enums_1.ScreenOrientation.Right;
        }
        else {
            return enums_1.ScreenOrientation.Left;
        }
    }
};
exports.default = getScreenOrientation;
//# sourceMappingURL=ledPrinterUtils.js.map