const nodeImu = require('nodeimu');
const IMU: NodeImu = new nodeImu.IMU();

const getMeasurement: () => Promise<ReadingData> = () => {
    return new Promise((resolve, reject) => {
        const gotValue = (error: string, data: ReadingData) => {
            if (error || !data.temperature) {
                reject(error);
            } else {
                data.timestamp = (new Date()).toJSON();
                resolve(data);
            }
        }

        IMU.getValue(gotValue);
    });
}

export default getMeasurement;
