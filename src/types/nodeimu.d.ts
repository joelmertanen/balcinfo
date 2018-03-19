declare interface ReadingData {
    timestamp?: string; // does not come from NodeImu
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
