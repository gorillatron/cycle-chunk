

export interface Cycler<T> {
  next(): T[];
  prev(): T[];
}


type NEXT = 1
const NEXT = 1

type PREV = 2
const PREV = 2


export default function CycleChunk<T>(array:T[], size: number = 1, startIndex: number = 0):Cycler<T> {

  let cursor = startIndex
  let prevDirection:number = 0


  const next = (_size:number = size) => {
    let out:T[] = []

    if(PREV == prevDirection)
      cursor = stepCursorAhead(cursor, array, _size)

    for(let iteration = 0; iteration < _size; iteration++) {
      if(cursor >= array.length) {
        cursor = 0
      }
      out.push(array[cursor])
      cursor++
    }

    prevDirection = NEXT

    return out
  }


  const prev = (_size:number = size) => {
    let out:T[] = []

    if(NEXT == prevDirection)
      cursor = stepCursorBehind(cursor, array, _size)

    for(let iteration = 0; iteration < _size; iteration++) {
      if(cursor == 0) {
        cursor = array.length - 1
      }
      else {
        cursor--
      }
      out.push(array[cursor])
    }

    prevDirection = PREV

    return out.reverse()
  }


  return {
    next, prev
  }  
}


const stepCursorBehind = (cursor:number, array:Array<any>, size:number) => {
  for(let iteration = 0; iteration < size; iteration++) {
    if(cursor == 0) {
      cursor = array.length - 1
    }
    else {
      cursor--
    }
  }
  return cursor
}


const stepCursorAhead = (cursor:number, array:Array<any>, size:number) => {
  for(let iteration = 0; iteration < size; iteration++) {
    if(cursor >= array.length) {
      cursor = 0
    }
    cursor++
  }
  return cursor
}