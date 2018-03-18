declare interface ReadingData {
    temperature: number;
    humidity: number;
    fusionPose: {
        x: number,
        y: number,
        z: number
    }
}

declare class NodeImu {
    getValue(cb: (e: string, data: ReadingData) => void): void;
}
