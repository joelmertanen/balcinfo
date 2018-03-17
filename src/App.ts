import getMeasurements from './Measure';
import consolePrinter from './ConsolePrinter';

const howOften = 1000 * 10; // 10s

const keepWorking = () => {
    // Node.JS is still missing native Promise.prototype.finally
    getMeasurements()
        .then(consolePrinter)
        .then(getTemperature)
        .catch(e => console.error(`error: ${e}`));
}

const getTemperature = () => setTimeout(keepWorking, howOften);

keepWorking();
