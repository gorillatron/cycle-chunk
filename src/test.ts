
import * as ava from 'ava'
import CycleChunk from './index'

const fixture = [1,2,3,4,5,6,7]


ava.test('cycling starting with next', (t) => {
  
  const cyclechunk = CycleChunk<number>(fixture, 3)
  
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


ava.test('cycling starting with prev', (t) => {
  
  const cyclechunk = CycleChunk<number>(fixture, 3)
  
  t.deepEqual(cyclechunk.prev(), [5,6,7])
  t.deepEqual(cyclechunk.prev(), [2,3,4])
  t.deepEqual(cyclechunk.prev(), [6,7,1])

  t.deepEqual(cyclechunk.next(), [2,3,4])
  t.deepEqual(cyclechunk.next(), [5,6,7])
  t.deepEqual(cyclechunk.next(), [1,2,3])
})


ava.test('should work with size as big as array', (t) => {
  
  const cyclechunk = CycleChunk<number>(fixture, 7)
  
  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6,7])
  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6,7])
  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6,7])

  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7])
  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7])
  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7])

  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6,7])
})


ava.test('should work with size bigger than array', (t) => {
  
  const cyclechunk = CycleChunk<number>(fixture, 8)
  
  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7,1])
  t.deepEqual(cyclechunk.next(), [2,3,4,5,6,7,1,2])
  t.deepEqual(cyclechunk.next(), [3,4,5,6,7,1,2,3])

  t.deepEqual(cyclechunk.prev(), [2,3,4,5,6,7,1,2])
  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6,7,1])
  t.deepEqual(cyclechunk.prev(), [7,1,2,3,4,5,6,7])

  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7,1])
})


ava.test('should work with size many times than array', (t) => {
  
  const cyclechunk = CycleChunk<number>(fixture, 25)
  
  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4])
  t.deepEqual(cyclechunk.next(), [5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1])

  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4])
  t.deepEqual(cyclechunk.prev(), [4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7])

  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4])
  
})


ava.test('should work with size bigger than half array size', (t) => {
  
  const cyclechunk = CycleChunk<number>(fixture, 6)
  
  t.deepEqual(cyclechunk.next(), [1,2,3,4,5,6])
  t.deepEqual(cyclechunk.next(), [7,1,2,3,4,5])
  t.deepEqual(cyclechunk.next(), [6,7,1,2,3,4])

  t.deepEqual(cyclechunk.prev(), [7,1,2,3,4,5])
  t.deepEqual(cyclechunk.prev(), [1,2,3,4,5,6])
})

  

