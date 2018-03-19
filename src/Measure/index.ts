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

const storeMeasurement = () => {
    const measure = cmdLineOptions.fakeMeasure ? getFakeMeasurement : getMeasurement;

    return measure()
        .then(measurement => {
            consolePrinter(measurement);
            if (cmdLineOptions.enableLed) {
                return Promise.all([persistReadingData(measurement), ledPrinter.print(measurement)]);
            } else {
                persistReadingData(measurement);
            }
        })
        .catch((e: string) => {
            console.error(`error: ${e}`)
            process.exit(1);
        });
}

storeMeasurement()
    .then(() => closeConnection());
