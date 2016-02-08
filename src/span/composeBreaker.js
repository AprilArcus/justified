/* @flow */

import whiteSpace from './whiteSpace'
import uax14 from './uax14'
import type { Placeholder } from '../utils/placeholders'

export default function composeBreaker (
  hyphenate: (string: string) => Array<string|Placeholder>,
): (text: string) => Array<Placeholder|string> {

  return whiteSpace(uax14(hyphenate))

}
