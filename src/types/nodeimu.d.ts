declare interface ReadingData {
    temperature: number;
    humidity: number;
}

declare class NodeImu {
    getValue(cb: (e: string, data: ReadingData) => void): void;
}
