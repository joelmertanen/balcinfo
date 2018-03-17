const nodeImu = require('nodeimu');
const IMU: NodeImu = new nodeImu.IMU();

const gotValue = (error: string, data: ReadingData) => {
    if (error || !data.temperature) {
        console.error(error);
        return;
    }
    console.log('Reading data!');
    console.log(`${data.temperature.toFixed(2)}°C`);
}

IMU.getValue(gotValue);
