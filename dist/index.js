"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NEXT = 1;
const PREV = 2;
function CycleChunk(array, size = 1, startIndex = 0) {
    let cursor = startIndex;
    let lastDirection = 0;
    const jumpCursorAhead = () => {
        if (cursor + size > array.length) {
            cursor = (cursor + size) - array.length;
        }
        else {
            cursor = cursor + size;
        }
    };
    const jumpCursorBehind = () => {
        if ((cursor - size) < 0) {
            cursor = array.length - (size - cursor);
        }
        else {
            cursor = cursor - size;
        }
    };
    return {
        next() {
            if (lastDirection == PREV) {
                jumpCursorAhead();
            }
            let out = chunk(array, size, cursor);
            jumpCursorAhead();
            lastDirection = NEXT;
            return out;
        },
        prev() {
            jumpCursorBehind();
            if (lastDirection == NEXT) {
                jumpCursorBehind();
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
