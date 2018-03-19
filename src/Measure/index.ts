import getFakeMeasurement from './MockMeasure';
import getMeasurement from './Measure';
import consolePrinter from './ConsolePrinter';
import ledPrinter from './LedPrinter';
import { closeConnection, persistReadingData } from '../RedisPersister';
import commandLineArgs from 'command-line-args';

const cmdLineOptionDefinitions = [
    { name: 'fakeMeasure', type: Boolean },
    { name: 'enableLed', type: Boolean }
];

const cmdLineOptions = commandLineArgs(cmdLineOptionDefinitions);

process.on('exit', function () {
    ledPrinter.clear();
});

const storeMeasurement = async () => {
    const measure = cmdLineOptions.fakeMeasure ? getFakeMeasurement : getMeasurement;

    try {
        const measurement = await measure();
        consolePrinter(measurement);
        if (cmdLineOptions.enableLed) {
            return Promise.all([persistReadingData(measurement), ledPrinter.print(measurement)]);
        } else {
            persistReadingData(measurement);
        }
    } catch (e) {
        console.error(`error: ${e}`)
        process.exit(1);
    }
    closeConnection();
}

storeMeasurement();
