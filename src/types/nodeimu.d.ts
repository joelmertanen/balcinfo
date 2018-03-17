declare interface ReadingData {
    temperature: number;
}

declare class NodeImu {
    getValue(cb: (e: string, data: ReadingData) => void): void;
}
