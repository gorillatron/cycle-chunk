
import * as ava from 'ava'
import CycleChunk from './index'

const fixture = [1,2,3,4,5,6,7]

if(console) {
  ava.test('performance', t => {
    const iterations = 9999999
    const array = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,9,1,2,3,4,5,67,78,8,7,4,23,2,1,3]
    const chunkSize = 10
    console.log('running next()', {iterations, arraySize: array.length, chunkSize})
    console.time("time spent")
    const cyclechunk = new CycleChunk<number>(array, chunkSize)
    for(var iteration = 0; iteration < iterations; iteration++) {
      cyclechunk.next()
    }
    console.timeEnd("time spent")
    t.is(1,1)
  })
}



ava.test('cycling starting with next', (t) => {
  
  const cyclechunk = new CycleChunk<number>(fixture, 3)
  
  t.deepEqual(cyclechunk.next(), [1,2,3])
  t.deepEqual(cyclechunk.next(), [4,5,6])
  t.deepEqual(cyclechunk.next(), [7,1,2])
  t.deepEqual(cyclechunk.next(), [3,4,5])
  t.deepEqual(cyclechunk.next(), [6,7,1])
  t.deepEqual(cyclechunk.next(), [2,3,4])
  t.deepEqual(cyclechunk.next(), [5,6,7])

  t.deepEqual(cyclechunk.prev(), [2,3,4])
  t.deepEqual(cyclechunk.prev(), [6,7,1])
  t.deepEqual(cyclechunk.prev(), [3,4,5])
  t.deepEqual(cyclechunk.prev(), [7,1,2])
  t.deepEqual(cyclechunk.prev(), [4,5,6])
  t.deepEqual(cyclechunk.prev(), [1,2,3])
  t.deepEqual(cyclechunk.prev(), [5,6,7])

  t.deepEqual(cyclechunk.next(), [1,2,3])
  t.deepEqual(cyclechunk.next(), [4,5,6])
  t.deepEqual(cyclechunk.next(), [7,1,2])
  t.deepEqual(cyclechunk.next(), [3,4,5])

  t.deepEqual(cyclechunk.prev(), [7,1,2])
})


ava.test('should be iterable, also in reverse', (t) => {
  
  let cyclechunk = new CycleChunk<number>(fixture, 3)
  
  const answers = [
    [1,2,3],
    [4,5,6],
    [7,1,2],
    [3,4,5],
    [6,7,1],
    [2,3,4],
    [5,6,7]
  ]

  let i = 0
  
  for(let chunk of cyclechunk) {
    t.deepEqual(answers[i], chunk)
    if(++i >= answers.length)
      break
  }

  let reversedCyclechunk = cyclechunk.reversed

  i = answers.length - 1

  for(let chunk of reversedCyclechunk) {
    i--
    t.deepEqual(answers[i], chunk)
    if(i == 0)
      break
  }

})


ava.test('cycling starting with prev', (t) => {
  
  const cyclechunk = new CycleChunk<number>(fixture, 3)
  
  t.deepEqual(cyclechunk.prev(), [5,6,7])
  t.deepEqual(cyclechunk.prev(), [2,3,4])
  t.deepEqual(cyclechunk.prev(), [6,7,1])

  t.deepEqual(cyclechunk.next(), [2,3,4])
  t.deepEqual(cyclechunk.next(), [5,6,7])
  t.deepEqual(cyclechunk.next(), [1,2,3])
})


ava.test('should work with size as big as array', (t) => {
  
  const cyclechunk = new CycleChunk<number>(fixture, 7)
  
  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6,7])
  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6,7])
  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6,7])

  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7])
  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7])
  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7])

  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6,7])
})


ava.test('should work with size bigger than array', (t) => {
  
  const cyclechunk = new CycleChunk<number>(fixture, 8)
  
  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7,1])
  t.deepEqual(cyclechunk.next(), [2,3,4,5,6,7,1,2])
  t.deepEqual(cyclechunk.next(), [3,4,5,6,7,1,2,3])

  t.deepEqual(cyclechunk.prev(), [2,3,4,5,6,7,1,2])
  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6,7,1])
  t.deepEqual(cyclechunk.prev(), [7,1,2,3,4,5,6,7])

  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7,1])
})


ava.test('should work with size many times than array', (t) => {
  
  const cyclechunk = new CycleChunk<number>(fixture, 25)
  
  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4])
  t.deepEqual(cyclechunk.next(), [5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1])

  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4])
  t.deepEqual(cyclechunk.prev(), [4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7])

  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4])
  
})


ava.test('should work with size bigger than half array size', (t) => {
  
  const cyclechunk = new CycleChunk<number>(fixture, 6)
  
  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6])
  t.deepEqual(cyclechunk.next(), [7,1,2,3,4,5])
  t.deepEqual(cyclechunk.next(), [6,7,1,2,3,4])

  t.deepEqual(cyclechunk.prev(), [7,1,2,3,4,5])
  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6])
})

  

