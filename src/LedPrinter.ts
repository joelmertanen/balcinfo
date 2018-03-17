import { temperatureFormatter } from './formatters';
const senseLed: SenseHatLed = require('sense-hat-led');

const print = (data: ReadingData): Promise<string> => {
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
        senseLed.showMessage(temperatureFormatter(data.temperature), 0.1, bgColor, textColor, cb);
    })
};

const clear = () => senseLed.sync.clear();

export default { print, clear };
