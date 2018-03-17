declare type RGB = Array<number>[3];

declare type FrameBuffer = {};
declare type Pixels = Array<RGB>[64];

declare interface SenseHatMatrix {
    clear: (frameBuffer: FrameBuffer, rgb: RGB) => void,
    flipH: (frameBuffer: FrameBuffer, redraw: boolean) => Pixels,
    flipV: (frameBuffer: FrameBuffer, redraw: boolean) => Pixels,
    getPixel: (frameBuffer: FrameBuffer, X: number, Y: number) => RGB,
    setPixel: (frameBuffer: FrameBuffer, X: number, Y: number, newPixel: RGB) => void,
    setRotation: (degrees: 0 | 90 | 180 | 270, redraw: boolean) => void
}
