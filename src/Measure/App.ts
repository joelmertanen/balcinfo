import getMeasurements from './Measure';
import consolePrinter from './ConsolePrinter';
import ledPrinter from './LedPrinter';
import sendResults from './ResultsPersisterWeb';
import config from '../../config.json';

process.on('exit', function () {
    ledPrinter.clear();
});

const howOften = 1000 * 60; // 1min

const keepWorking = () => {
    // Node.JS is still missing native Promise.prototype.finally
    getMeasurements()
        .then(measurements => {
            consolePrinter(measurements);
            if (config.noLed) {
                return sendResults(measurements);
            } else {
                return Promise.all([sendResults(measurements), ledPrinter.print(measurements)]);
            }
        })
        .then(getTemperature)
        .catch((e: string) => console.error(`error: ${e}`));
}

const getTemperature = () => setTimeout(keepWorking, howOften);

keepWorking();
