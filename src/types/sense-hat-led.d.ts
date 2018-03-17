declare type RGB = Array<number>;

declare type FrameBuffer = {};
declare type LedScreen = Array<RGB>[64];
declare type WhenDone = (err: string, data: any) => void;

declare interface SenseHatLed {
    sync: {
        clear: (rgb?: RGB) => void,
    },
    flipH: (redraw: boolean) => LedScreen,
    flipV: (redraw: boolean) => LedScreen,
    getPixel: (X: number, Y: number) => RGB,
    showMessage: (text: string, speed: number, textColour: RGB, backColor: RGB, whenDone: WhenDone) => void,
    setPixel: (X: number, Y: number, red: number, green: number, blue: number, whenDone: WhenDone) => void,
    setPixels: (pixels: LedScreen, whenDone: WhenDone) => void,
    setRotation: (degrees: 0 | 90 | 180 | 270, redraw: boolean, whenDone: WhenDone) => void
}
