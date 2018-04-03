
import * as ava from 'ava'
import CycleChunk from './index'

const fixture = [1,2,3,4,5,6,7]

ava.test('something', (t) => {
  
  const cyclechunk = CycleChunk<number>(fixture, 3)
  
  t.deepEqual(cyclechunk.next().value, [1,2,3])
  t.deepEqual(cyclechunk.next().value, [4,5,6])
  t.deepEqual(cyclechunk.next().value, [7,1,2])
  t.deepEqual(cyclechunk.next().value, [3,4,5])
  t.deepEqual(cyclechunk.next().value, [6,7,1])
  t.deepEqual(cyclechunk.next().value, [2,3,4])
  t.deepEqual(cyclechunk.next().value, [5,6,7])

})

