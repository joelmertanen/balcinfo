import { SenseHatLed, RGB, WhenDone } from '../types/sense-hat-led';
import { temperatureFormatter } from './formatters';
import getScreenOrientation from './ledPrinterUtils';
import { PersistedResult} from '../RedisPersister';

const print = (data: PersistedResult, deviceData: ReadingData): Promise<string> => {
  const senseLed: SenseHatLed = require('sense-hat-led');
  const textColor: RGB = [250, 250, 250];
  const bgColor: RGB = [20, 20, 20];

  return new Promise((resolve, reject) => {
    const cb: WhenDone = (err) => {
      if (!err) {
        resolve();
      } else {
        console.error(err);
        reject(err);
      }
    }

    const orientation = getScreenOrientation(deviceData.fusionPose);
    senseLed.sync.setRotation(orientation, false);

    senseLed.showMessage(`  ${data.temperature}C  `, 0.2, bgColor, textColor, cb);
  })
};

const clear = () => {
  const senseLed: SenseHatLed = require('sense-hat-led');
  senseLed.sync.clear()
};

export default { print, clear };

