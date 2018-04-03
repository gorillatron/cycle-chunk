
# cycle-chunk [![build status](https://travis-ci.org/gorillatron/cycle-chunk.svg?branch=master)](https://travis-ci.org/gorillatron/cycle-chunk.svg?branch=master)

Cycle through an array indefinetly providing a chunk of custom size per iteration.
Usefull in showing slideshows, panels, tabs and so forth.

**Install:**
```bash
npm i cycle-chunk
```

**Example:**
```js
import CycleChunk from 'cycle-chunk'

const cyclechunk = new CycleChunk([1,2,3,4,5,6,7], 3)
  
cyclechunk.next() == [1,2,3]
cyclechunk.next() == [4,5,6]
cyclechunk.next() == [7,1,2]

cyclechunk.prev() == [4,5,6])
cyclechunk.prev() == [1,2,3])
cyclechunk.prev() == [5,6,7])
```


# API

## class CycleChunk\<T> extends Array
### **constructor(array:T[], size?: number = 0, startIndex?: number = 0)**
### **next():T[]**
### **prev():T[]**
### **current():T[]**
### **public reversed: IterableIterator<T[]>**
### **public \* \[Symbol.iterator\]():IterableIterator<T[]>**
