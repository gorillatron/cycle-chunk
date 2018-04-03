"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava = __importStar(require("ava"));
const index_1 = __importDefault(require("./index"));
const fixture = [1, 2, 3, 4, 5, 6, 7];
ava.test('something', (t) => {
    const cyclechunk = index_1.default(fixture, 3);
    t.deepEqual(cyclechunk.next().value, [1, 2, 3]);
    t.deepEqual(cyclechunk.next().value, [4, 5, 6]);
    t.deepEqual(cyclechunk.next().value, [7, 1, 2]);
    t.deepEqual(cyclechunk.next().value, [3, 4, 5]);
    t.deepEqual(cyclechunk.next().value, [6, 7, 1]);
    t.deepEqual(cyclechunk.next().value, [2, 3, 4]);
    t.deepEqual(cyclechunk.next().value, [5, 6, 7]);
});
