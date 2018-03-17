const nodeImu = require('nodeimu');
const IMU: NodeImu = new nodeImu.IMU();

const readTemperature: () => Promise<string> = () => {
    return new Promise((resolve, reject) => {
        const gotValue = (error: string, data: ReadingData) => {
            if (error || !data.temperature) {
                reject(error);
            } else {
                resolve(data.temperature.toFixed(2));
            }
        }

        IMU.getValue(gotValue);
    });
    
}

export default readTemperature;
