import readTemperature from './Temperature';
const howOften = 1000 * 10; // 10s

const printTemperature = () => {
    const temperatureFormatter = (deg: string) => `${deg}°C`

    // Node.JS is still missing native Promise.prototype.finally
    readTemperature()
        .then(temp => console.log(temperatureFormatter(temp)))
        .then(getTemperature)
        .catch(e => console.error(`error: ${e}`));
}

const getTemperature = () =>
    setTimeout(() => {
        printTemperature();
    }, howOften);

getTemperature();
