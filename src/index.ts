type NEXT = "NEXT"
const NEXT = "NEXT"

type PREV = "PREV"
const PREV = "PREV"

type DIRECTION = "" | NEXT | PREV


export default class CycleChunk<T> extends Array {


  private chunkSize:number = 0
  private cursor:number = 0
  private prevDirection:DIRECTION = ""
  private array:T[] = []
  private _current:T[] = []

  
  constructor(array:T[], size: number = 1, startIndex: number = 0) {
    super()
    this.chunkSize = size
    this.cursor = startIndex
    this.array = array
  }


  private stepCursorBehind() {
    for(let iteration = 0; iteration < this.chunkSize; iteration++) {
      if(this.cursor == 0) {
        this.cursor = this.array.length - 1
      }
      else {
        this.cursor--
      }
    }
  }
  

  private stepCursorAhead() {
    for(let iteration = 0; iteration < this.chunkSize; iteration++) {
      if(this.cursor >= this.array.length) {
        this.cursor = 0
      }
      this.cursor++
    }
  }


  public next() {
    let out:T[] = []

    if(PREV == this.prevDirection)
      this.stepCursorAhead()

    for(let iteration = 0; iteration < this.chunkSize; iteration++) {
      if(this.cursor >= this.array.length) {
        this.cursor = 0
      }
      out.push(this.array[this.cursor])
      this.cursor++
    }

    this.prevDirection = NEXT
    this._current = out

    return out
  }


  public prev() {
    let out:T[] = []

    if(NEXT == this.prevDirection)
      this.stepCursorBehind()

    for(let iteration = 0; iteration < this.chunkSize; iteration++) {
      if(this.cursor == 0) {
        this.cursor = this.array.length - 1
      }
      else {
        this.cursor--
      }
      out.push(this.array[this.cursor])
    }

    out.reverse()
    this.prevDirection = PREV
    this._current = out

    return out
  }


  get current():T[] {
    return this._current
  }


  get reversed() {
    const __this = this
    function* gen() {
      while(true) {
        yield __this.prev()
      }
    }
    return gen()
  }


  public * [Symbol.iterator]() {
    while(true) {
      yield this.next()
    }
  } 


}


