
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
  
cyclechunk.next() == [1,2,3]
cyclechunk.next() == [4,5,6]
cyclechunk.next() == [7,1,2]

cyclechunk.prev(), [4,5,6])
cyclechunk.prev(), [1,2,3])
cyclechunk.prev(), [5,6,7])
```


# API

## function CycleChunk\<T>(array:T[], size: number, startIndex: number): Cycler\<T>
Returns a `Cycler` object with next() and prev() methods.

## interface Cycler<T>
```typescript
interface Cycler {
  next(): T[];
  prev(): T[];
}
```
