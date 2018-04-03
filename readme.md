
# cycle-chunk

Cycle through an array indefinetly providing a chunk of custom size per iteration.
Usefull in showing slideshows, panels, tabs and so forth.

**Install:**
```bash
npm i cycle-chunk
```

**Example:**
```js
import CycleChunk from 'cycle-chunk'

const cyclechunk = CycleChunk([1,2,3,4,5,6,7], 3)
  
cyclechunk.next().value == [1,2,3]
cyclechunk.next().value == [4,5,6]
cyclechunk.next().value == [7,1,2]
cyclechunk.next().value == [3,4,5]
cyclechunk.next().value == [6,7,1]
cyclechunk.next().value == [2,3,4]
cyclechunk.next().value == [5,6,7]
```


## API

### CycleChunk<T>(array:T[], size: number, startIndex: number): IterableIterator<T[]>
