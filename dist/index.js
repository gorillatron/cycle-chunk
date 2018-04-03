"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NEXT = 1;
const PREV = 2;
function CycleChunk(array, size = 1, startIndex = 0) {
    let cursor = startIndex;
    let prevDirection = 0;
    const next = (_size = size) => {
        let out = [];
        if (PREV == prevDirection)
            cursor = stepCursorAhead(cursor, array, _size);
        for (var iteration = 0; iteration < _size; iteration++) {
            if (cursor >= array.length) {
                cursor = 0;
            }
            out.push(array[cursor]);
            cursor++;
        }
        prevDirection = NEXT;
        return out;
    };
    const prev = (_size = size) => {
        let out = [];
        if (NEXT == prevDirection)
            cursor = stepCursorBehind(cursor, array, _size);
        for (var iteration = 0; iteration < _size; iteration++) {
            if (cursor == 0) {
                cursor = array.length - 1;
            }
            else {
                cursor--;
            }
            out.push(array[cursor]);
        }
        prevDirection = PREV;
        return out.reverse();
    };
    return {
        next, prev
    };
}
exports.default = CycleChunk;
const stepCursorBehind = (cursor, array, size) => {
    for (let iteration = 0; iteration < size; iteration++) {
        if (cursor == 0) {
            cursor = array.length - 1;
        }
        else {
            cursor--;
        }
    }
    return cursor;
};
const stepCursorAhead = (cursor, array, size) => {
    for (let iteration = 0; iteration < size; iteration++) {
        if (cursor >= array.length) {
            cursor = 0;
        }
        cursor++;
    }
    return cursor;
};
