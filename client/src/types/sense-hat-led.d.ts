import { ScreenOrientation } from './enums';

export type RGB = Array<number>;

export type LedScreen = Array<RGB>[64];
export type WhenDone = (err: string, data: any) => void;

export interface SenseHatLed {
    sync: {
        clear: (rgb?: RGB) => void,
        setRotation: (degrees: ScreenOrientation, redraw: boolean) => void
    },
    flipH: (redraw: boolean) => LedScreen,
    flipV: (redraw: boolean) => LedScreen,
    getPixel: (X: number, Y: number) => RGB,
    showMessage: (text: string, speed: number, textColour: RGB, backColor: RGB, whenDone: WhenDone) => void,
    setPixel: (X: number, Y: number, red: number, green: number, blue: number, whenDone: WhenDone) => void,
    setPixels: (pixels: LedScreen, whenDone: WhenDone) => void
}
