const senseLed: SenseHatLed = require('sense-hat-led');

const print = (text: string) => {
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
        senseLed.showMessage(text, 0.1, bgColor, textColor, cb);
    })
};

export default print;
