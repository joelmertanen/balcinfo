import { ScreenOrientation } from './types/enums';

const getScreenOrientation = (orientation: {
    x: number, y: number, z: number
}): ScreenOrientation => {
    const quarter = Math.PI / 2;

    // if up or down
    if (Math.abs(orientation.y) <= quarter / 2) {
        if (orientation.x < 0) {
            return ScreenOrientation.Up;
        } else {
            return ScreenOrientation.Down;
        }
    } else {
        if (orientation.y <= 0) {
            return ScreenOrientation.Right;
        } else {
            return ScreenOrientation.Left;
        }
    }
};

export default getScreenOrientation;