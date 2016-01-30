/* @flow */

export function flatten(array: Array<any|Array<any>>): Array<any> {
  const flattened = []
  for (let i = 0, outerLength = array.length; i < outerLength; i++) {
    const e = array[i]
    if (typeof e === 'object' && e.length) {
      for (let j = 0, innerLength = e.length; j < innerLength; j++) {
        flattened.push(e[j])
      }
    } else {
      flattened.push(e)
    }
  }
  return flattened
}
