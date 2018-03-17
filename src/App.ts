import getMeasurements from './Measure';
const howOften = 1000 * 10; // 10s

const printTemperature = () => {
    const temperatureFormatter = (deg: number) => `${deg.toFixed(4)}°C`
    const humidityFormatter = (hum: number) => `${hum.toFixed(4)}%`

    // Node.JS is still missing native Promise.prototype.finally
    getMeasurements()
        .then(data => {
            const str = `Temperature: ${temperatureFormatter(data.temperature)}
            Humidity: ${humidityFormatter(data.humidity)}`;
            console.log(str)
        })
        .then(getTemperature)
        .catch(e => console.error(`error: ${e}`));
}

const getTemperature = () =>
    setTimeout(() => {
        printTemperature();
    }, howOften);

printTemperature();
