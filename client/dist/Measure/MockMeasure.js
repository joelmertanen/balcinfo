"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getFakeMeasurement = () => {
    const value = {
        temperature: 111.11111,
        humidity: 22.22222,
        fusionPose: { x: 0, y: 0, z: 0 }
    };
    console.warn('!!! Fake measurements coming in');
    return new Promise((resolve) => {
        resolve(value);
    });
};
exports.default = getFakeMeasurement;
//# sourceMappingURL=MockMeasure.js.map