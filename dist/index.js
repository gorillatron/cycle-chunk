"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* CycleChunk(array, size = 1, startIndex = 0) {
    let index = startIndex;
    while (true) {
        if (index + 1 > array.length) {
            index = index - array.length;
        }
        yield chunk(array, size, index);
        index = index + size;
    }
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
