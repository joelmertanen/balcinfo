import { temperatureFormatter } from './formatters';
const senseLed: SenseHatLed = require('sense-hat-led');

const ledPrinter = (data: ReadingData): Promise<string> => {
    const textColor: RGB = [250, 142, 142];
    const bgColor: RGB = [199, 228, 210];

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

export default ledPrinter;
