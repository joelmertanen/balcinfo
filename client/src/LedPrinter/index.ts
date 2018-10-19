import ledPrinter from './LedPrinter';
import getMeasurement from '../Measure/Measure';
import { closeConnection, getLatest } from '../RedisPersister';

process.on('exit', function () {
  ledPrinter.clear();
});

const storeMeasurement = async () => {
  try {
    const latestMeasurement = await getLatest();
    if (latestMeasurement) {
      const deviceData = await getMeasurement();
      await ledPrinter.print(latestMeasurement, deviceData);
    }
  } catch (e) {
    console.error(`error: ${e}`)
    process.exit(1);
  }

  process.exit(0);
}

storeMeasurement();

