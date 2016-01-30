/* @flow */
/* eslint-disable no-plusplus */

export function intersperse<T, U>(array: Array<T>, delimiter: U): Array<T|U> {

  let length = array.length
  if (length === 0) return []
  if (length === 1) return [array[0]]

  let length2 = length * 2
  const interspersed = new Array(--length2)
  interspersed[0] = array[0]

  while (--length) {
    interspersed[--length2] = array[length]
    interspersed[--length2] = delimiter
  }

  return interspersed

}
