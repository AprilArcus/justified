// /* @flow */

// import type { Placeholder } from './placeholders'

// export default function flatten (
//   array: Array<Placeholder|{length: number, [key: number]: string|Placeholder}>
// ): Array<Placeholder|string> {
//   const flattened = []
//   for (let i = 0, outerLength = array.length; i < outerLength; i++) {
//     // if (i in array) {
//     const e = array[i]
//     // if (Array.isArray(e)) {
//     if (typeof e === 'object') {
//       if (e !== null && 'length' in e) {
//         for (let j = 0, innerLength = e.length; j < innerLength; j++) {
//         // if (j in e) {
//           flattened.push(e[j])
//         // }
//         }
//       }
//     } else {
//       flattened.push(e)
//     }
//     // }
//   }
//   return flattened
// }
