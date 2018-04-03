"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NEXT = 1;
const PREV = 2;
class CycleChunk extends Array {
    constructor(array, size = 1, startIndex = 0) {
        super();
        this.size = 0;
        this.cursor = 0;
        this.prevDirection = 0;
        this.array = [];
        this._current = [];
        this.size = size;
        this.cursor = startIndex;
        this.array = array;
    }
    stepCursorBehind() {
        for (let iteration = 0; iteration < this.size; iteration++) {
            if (this.cursor == 0) {
                this.cursor = this.array.length - 1;
            }
            else {
                this.cursor--;
            }
        }
    }
    stepCursorAhead() {
        for (let iteration = 0; iteration < this.size; iteration++) {
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
        for (let iteration = 0; iteration < this.size; iteration++) {
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
        for (let iteration = 0; iteration < this.size; iteration++) {
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
        return this.current;
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
