import getMeasurement from './Measure';
import consolePrinter from './ConsolePrinter';
import ledPrinter from './LedPrinter';
import { persistReadingData } from '../RedisPersister';
import config from '../../config.json';

process.on('exit', function () {
    ledPrinter.clear();
});

const howOften = 1000 * 60; // 1min

const keepWorking = () => {
    // Node.JS is still missing native Promise.prototype.finally
    getMeasurement()
        .then(measurement => {
            consolePrinter(measurement);
            if (config.ledEnabled) {
                return Promise.all([persistReadingData(measurement), ledPrinter.print(measurement)]);
            } else {
                persistReadingData(measurement);
            }
        })
        .then(getTemperature)
        .catch((e: string) => console.error(`error: ${e}`));
}

const getTemperature = () => setTimeout(keepWorking, howOften);

keepWorking();
