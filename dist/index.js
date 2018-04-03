"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NEXT = "NEXT";
const PREV = "PREV";
class CycleChunk extends Array {
    constructor(array, size = 1, startIndex = 0) {
        super();
        this.chunkSize = 0;
        this.cursor = 0;
        this.prevDirection = "";
        this.array = [];
        this._current = [];
        this.chunkSize = size;
        this.cursor = startIndex;
        this.array = array;
    }
    stepCursorBehind() {
        for (let iteration = 0; iteration < this.chunkSize; iteration++) {
            if (this.cursor == 0) {
                this.cursor = this.array.length - 1;
            }
            else {
                this.cursor--;
            }
        }
    }
    stepCursorAhead() {
        for (let iteration = 0; iteration < this.chunkSize; iteration++) {
            if (this.cursor >= this.array.length) {
                this.cursor = 0;
            }
            this.cursor++;
        }
    }
    next() {
        let out = [];
        if (PREV == this.prevDirection)
            this.stepCursorAhead();
        for (let iteration = 0; iteration < this.chunkSize; iteration++) {
            if (this.cursor >= this.array.length) {
                this.cursor = 0;
            }
            out.push(this.array[this.cursor]);
            this.cursor++;
        }
        this.prevDirection = NEXT;
        this._current = out;
        return out;
    }
    prev() {
        let out = [];
        if (NEXT == this.prevDirection)
            this.stepCursorBehind();
        for (let iteration = 0; iteration < this.chunkSize; iteration++) {
            if (this.cursor == 0) {
                this.cursor = this.array.length - 1;
            }
            else {
                this.cursor--;
            }
            out.push(this.array[this.cursor]);
        }
        out.reverse();
        this.prevDirection = PREV;
        this._current = out;
        return out;
    }
    get current() {
        return this._current;
    }
    get reversed() {
        const __this = this;
        function* gen() {
            while (true) {
                yield __this.prev();
            }
        }
        return gen();
    }
    *[Symbol.iterator]() {
        while (true) {
            yield this.next();
        }
    }
}
exports.default = CycleChunk;
