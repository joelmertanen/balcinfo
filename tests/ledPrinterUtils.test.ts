import getScreenOrientation from "../src/ledPrinterUtils";
import { ScreenOrientation } from '../src/types/enums';

const chai = require("chai");
const expect = chai.expect;

describe("getScreenRotation", () => {
    it("should know Up with values below", () => {
        const orientation = { x: 3 * Math.PI / 8, y: 0.1, z: 0 };
        expect(getScreenOrientation(orientation)).to.equal(ScreenOrientation.Up);
    });
    it("should know Up with values above", () => {
        const orientation = { x: 5 * Math.PI / 8, y: -0.1, z: 0 };
        expect(getScreenOrientation(orientation)).to.equal(ScreenOrientation.Up);
    });

    it("should know Right with values below", () => {
        const orientation = { x: - Math.PI, y: 3 * Math.PI / 8, z: 0 };
        expect(getScreenOrientation(orientation)).to.equal(ScreenOrientation.Right);
    });
    it("should know Right with values above", () => {
        const orientation = { x: -7 * Math.PI / 8, y: 5 * Math.PI / 8, z: 0 };
        expect(getScreenOrientation(orientation)).to.equal(ScreenOrientation.Right);
    });

    it("should know Down with values below", () => {
        const orientation = { x: -3 * Math.PI / 8, y: 0.1, z: 0 };
        expect(getScreenOrientation(orientation)).to.equal(ScreenOrientation.Down);
    });
    it("should know Down with values above", () => {
        const orientation = { x: -5 * Math.PI / 8, y: -0.1, z: 0 };
        expect(getScreenOrientation(orientation)).to.equal(ScreenOrientation.Down);
    });

    it("should know Left with values below", () => {
        const orientation = { x: Math.PI, y: -5 * Math.PI / 8, z: 0 };
        expect(getScreenOrientation(orientation)).to.equal(ScreenOrientation.Left);
    });
    it("should know Left with values above", () => {
        const orientation = { x: 7 * Math.PI / 8, y: -3 * Math.PI / 8, z: 0 };
        expect(getScreenOrientation(orientation)).to.equal(ScreenOrientation.Left);
    });
});
