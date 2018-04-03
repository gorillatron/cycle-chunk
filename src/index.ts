

export interface Cycler<T> {
  next(): T[];
  prev(): T[];
}


const NEXT = 1
const PREV = 2


export default function CycleChunk<T>(array:T[], size: number = 1, startIndex: number = 0):Cycler<T> {

  let cursor = startIndex
  let lastDirection:number = 0

  const jumpCursorAhead = () => {
    if(cursor + size > array.length) {
      cursor = (cursor + size) - array.length
    }
    else {
      cursor = cursor + size
    }
    
  }

  const jumpCursorBehind = () => {
    if((cursor - size) < 0) {
      cursor = array.length - (size - cursor)
    }
    else {
      cursor = cursor - size
    }
  }

  return {

    next() {
      if(lastDirection == PREV) {
        jumpCursorAhead()
      }
      let out = chunk(array, size, cursor)
      jumpCursorAhead()
      lastDirection = NEXT
      return out
    },

    prev() {
      jumpCursorBehind()
      if(lastDirection == NEXT) {
        jumpCursorBehind()
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