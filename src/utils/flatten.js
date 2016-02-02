/* @flow */

export function flatten(array: Array<any|Array<any>>): Array<any> {
  const flattened = []
  for (let i = 0, outerLength = array.length; i < outerLength; i++) {
    if (i in array) {
      const e = array[i]
      if (typeof e === 'object' && e !== null && 'length' in e) {
        for (let j = 0, innerLength = e.length; j < innerLength; j++) {
          if (j in e) flattened.push(e[j])
        }
      } else {
        flattened.push(e)
      }
    }
  }
  return flattened
}
