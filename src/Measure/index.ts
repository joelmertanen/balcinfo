import getFakeMeasurement from './MockMeasure';
import getMeasurement from './Measure';
import consolePrinter from './ConsolePrinter';
import ledPrinter from './LedPrinter';
import { closeConnection, persistReadingData } from '../RedisPersister';
import commandLineArgs from 'command-line-args';
import { findTag, getRuuviResult } from './Ruuvitag';

const cmdLineOptionDefinitions = [
  { name: 'fakeMeasure', type: Boolean },
  { name: 'enableLed', type: Boolean },
  { name: 'noRuuvi', type: Boolean }
];

const cmdLineOptions = commandLineArgs(cmdLineOptionDefinitions);

process.on('exit', function () {
  ledPrinter.clear();
});

const getRuuviData = async () => {
  const ruuviInstance = await findTag('fac2a9cfdb55');
  return await getRuuviResult(ruuviInstance);
};

const storeMeasurement = async () => {
  const measure = cmdLineOptions.noRuuvi ? getMeasurement : getRuuviData;

  try {
    const measurement = await getRuuviData();
    consolePrinter(measurement);
    await persistReadingData(measurement);
  } catch (e) {
    console.error(`error: ${e}`)
    process.exit(1);
  }
  closeConnection();

  process.exit(0);
}

storeMeasurement();

