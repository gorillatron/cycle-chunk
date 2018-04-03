

export default function* CycleChunk<T>(array:T[], size: number = 1, startIndex: number = 0):IterableIterator<T[]> {

  let index = startIndex
  
  while(true) {
    if(index + 1 > array.length) {
      index = index - array.length
    }
    yield chunk<T>(array, size, index)
    index = index + size
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