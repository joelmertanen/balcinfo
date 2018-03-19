const nodeImu = require('nodeimu');
const IMU: NodeImu = new nodeImu.IMU();

const getMeasurements: () => Promise<ReadingData> = () => {
    return new Promise((resolve, reject) => {
        const gotValue = (error: string, data: ReadingData) => {
            if (error || !data.temperature) {
                reject(error);
            } else {
                resolve(data);
            }
        }

        IMU.getValue(gotValue);
    });
}

export default getMeasurements;
