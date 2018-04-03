type NEXT = 1
const NEXT = 1

type PREV = 2
const PREV = 2

type DIRECTION = 0 | NEXT | PREV


export default class CycleChunk<T> extends Array {


  private size:number = 0
  private cursor:number = 0
  private prevDirection:DIRECTION = 0
  private array:T[] = []
  private _current:T[] = []

  
  constructor(array:T[], size: number = 1, startIndex: number = 0) {
    super()
    this.size = size
    this.cursor = startIndex
    this.array = array
  }


  private stepCursorBehind() {
    for(let iteration = 0; iteration < this.size; iteration++) {
      if(this.cursor == 0) {
        this.cursor = this.array.length - 1
      }
      else {
        this.cursor--
      }
    }
  }
  

  private stepCursorAhead() {
    for(let iteration = 0; iteration < this.size; iteration++) {
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

    for(let iteration = 0; iteration < this.size; iteration++) {
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

    for(let iteration = 0; iteration < this.size; iteration++) {
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
    return this.current
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


