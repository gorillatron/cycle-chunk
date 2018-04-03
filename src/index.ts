

export interface Cycler<T> {
  next(): T[];
  prev(): T[];
}


const NEXT = 1
const PREV = 2


export default function CycleChunk<T>(array:T[], size: number = 1, startIndex: number = 0):Cycler<T> {

  let cursor = startIndex
  let lastDirection:number = 0

  if(size > array.length)
    throw new RangeError("chunk size cannot be bigger than given array")

  const jumpCursor = (direction:number) => {
    switch(direction) {

      case NEXT:
        if(cursor + size > array.length) {
          cursor = (cursor + size) - array.length
        }
        else {
          cursor = cursor + size
        }
        break
      
      case PREV:
        if((cursor - size) < 0) {
          cursor = array.length - (size - cursor)
        }
        else {
          cursor = cursor - size
        }
        break

    }
  }

  return {

    next() {
      if(lastDirection == PREV) {
        jumpCursor(NEXT)
      }
      let out = chunk(array, size, cursor)
      jumpCursor(NEXT)
      lastDirection = NEXT
      return out
    },

    prev() {
      jumpCursor(PREV)
      if(lastDirection == NEXT) {
        jumpCursor(PREV)
      }
      let out = chunk(array, size, cursor)
      lastDirection = PREV
      return out
    }

  }  
}



const chunk = <T>(array:T[], size: number = 1, startIndex: number = 0):T[] => {

  if(startIndex > array.length) {
    startIndex = 0
  }

  var out:T[] = []

  for(var iteration = 0; iteration < size; iteration++) {
    var index = startIndex + iteration
    if(index < array.length)
      out = out.concat([array[index]])
    else
      out = out.concat([array[iteration - (array.length - startIndex)]])
  }

  return out
}