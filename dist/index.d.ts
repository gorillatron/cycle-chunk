export interface Cycler<T> {
    next(): T[];
    prev(): T[];
}
export default function CycleChunk<T>(array: T[], size?: number, startIndex?: number): Cycler<T>;
