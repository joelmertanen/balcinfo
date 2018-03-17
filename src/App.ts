const IMU: NodeImu = new (require('nodeimu').IMU());

const gotValue = (error: string, data: ReadingData) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log('Reading data!');
    console.log(data.temperature);
}

IMU.getValue(gotValue);
