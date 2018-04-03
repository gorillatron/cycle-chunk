export default class CycleChunk<T> extends Array {
    private chunkSize;
    private cursor;
    private prevDirection;
    private array;
    private _current;
    constructor(array: T[], size?: number, startIndex?: number);
    private stepCursorBehind();
    private stepCursorAhead();
    next(): T[];
    prev(): T[];
    readonly current: T[];
    readonly reversed: IterableIterator<T[]>;
    [Symbol.iterator](): IterableIterator<T[]>;
}
