const getFakeMeasurement: () => Promise<ReadingData> = () => {
    const value: ReadingData = {
        temperature: 111.11111,
        humidity: 22.22222,
        fusionPose: {x: 0, y: 0, z: 0}
    };
    console.warn('!!! Fake measurements coming in');
    return new Promise((resolve) => {
        resolve(value);
    });
};

export default getFakeMeasurement;
