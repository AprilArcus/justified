/* @flow */

import whiteSpace from './whiteSpace'
import uax14 from './uax14'
import hyphenatorPromise from '../word/hyphenatorPromise'
// import flatten from '../utils/flatten'
import type { Placeholder } from '../utils/placeholders'

export default function breakSpanPromise (
  text: string,
  language: string
): Promise<Array<Placeholder|string>> {

  return hyphenatorPromise(language)
    .then(hyphenate => whiteSpace(uax14(hyphenate), text))

}
