import getMeasurements from './Measure';
import consolePrinter from './ConsolePrinter';
import ledPrinter from './LedPrinter';
import sendResults from './ResultsPersisterWeb';

process.on('exit', function () {
    ledPrinter.clear();
});

const howOften = 1000 * 10; // 10s

const keepWorking = () => {
    // Node.JS is still missing native Promise.prototype.finally
    getMeasurements()
        .then(measurements => {
            consolePrinter(measurements);
            return sendResults(measurements);
            //return ledPrinter.print(measurements);
        })
        .then(getTemperature)
        .catch((e: string) => console.error(`error: ${e}`));
}

const getTemperature = () => setTimeout(keepWorking, howOften);

keepWorking();
