import readTemperature from './Temperature';
const howOften = 1000 * 10; // 10s

const temperatureFormatter = (deg:string) => `${deg}°C`

setTimeout(() => {
    readTemperature()
        .then(temp => console.log(temperatureFormatter(temp)))
        .catch(e => console.error(`error: ${e}`));
}, howOften);
