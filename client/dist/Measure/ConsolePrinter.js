"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatters_1 = require("../LedPrinter/formatters");
const consolePrinter = (data) => {
    const str = `***************
    ${data.timestamp}
  Temperature: ${formatters_1.temperatureFormatter(data.temperature)}
  Humidity: ${formatters_1.humidityFormatter(data.humidity)}`;
    console.log(str);
};
exports.default = consolePrinter;
//# sourceMappingURL=ConsolePrinter.js.map