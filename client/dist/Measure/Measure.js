"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMeasurement = () => {
    const nodeImu = require('nodeimu');
    const IMU = new nodeImu.IMU();
    return new Promise((resolve, reject) => {
        const gotValue = (error, data) => {
            if (error || !data.temperature) {
                reject(error);
            }
            else {
                data.timestamp = (new Date()).toJSON();
                resolve(data);
            }
        };
        IMU.getValue(gotValue);
    });
};
exports.default = getMeasurement;
//# sourceMappingURL=Measure.js.map