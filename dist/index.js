"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NEXT = 1;
const PREV = 2;
function CycleChunk(array, size = 1, startIndex = 0) {
    let cursor = startIndex;
    let lastDirection = 0;
    if (size > array.length)
        throw new RangeError("chunk size cannot be bigger than given array");
    const jumpCursor = (direction) => {
        switch (direction) {
            case NEXT:
                if (cursor + size > array.length) {
                    cursor = (cursor + size) - array.length;
                }
                else {
                    cursor = cursor + size;
                }
                break;
            case PREV:
                if ((cursor - size) < 0) {
                    cursor = array.length - (size - cursor);
                }
                else {
                    cursor = cursor - size;
                }
                break;
        }
    };
    return {
        next() {
            if (lastDirection == PREV) {
                jumpCursor(NEXT);
            }
            let out = chunk(array, size, cursor);
            jumpCursor(NEXT);
            lastDirection = NEXT;
            return out;
        },
        prev() {
            jumpCursor(PREV);
            if (lastDirection == NEXT) {
                jumpCursor(PREV);
            }
            let out = chunk(array, size, cursor);
            lastDirection = PREV;
            return out;
        }
    };
}
exports.default = CycleChunk;
const chunk = (array, size = 1, startIndex = 0) => {
    if (startIndex > array.length) {
        startIndex = 0;
    }
    var out = [];
    for (var iteration = 0; iteration < size; iteration++) {
        var index = startIndex + iteration;
        if (index < array.length)
            out = out.concat([array[index]]);
        else
            out = out.concat([array[iteration - (array.length - startIndex)]]);
    }
    return out;
};
