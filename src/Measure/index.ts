import getFakeMeasurement from './MockMeasure';
import getMeasurement from './Measure';
import consolePrinter from './ConsolePrinter';
import ledPrinter from './LedPrinter';
import { persistReadingData } from '../RedisPersister';
import config from '../../config.json';
import commandLineArgs from 'command-line-args';

const cmdLineOptionDefinitions = [
    { name: 'fakeMeasure', type: Boolean },
    { name: 'enableLed', type: Boolean }
];

const cmdLineOptions = commandLineArgs(cmdLineOptionDefinitions);

process.on('exit', function () {
    ledPrinter.clear();
});

const howOften = 1000 * 60; // 1min

const keepWorking = () => {
    const measure = cmdLineOptions.fakeMeasure ? getFakeMeasurement : getMeasurement;
    // Node.JS is still missing native Promise.prototype.finally
    measure()
        .then(measurement => {
            consolePrinter(measurement);
            if (cmdLineOptions.enableLed) {
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
