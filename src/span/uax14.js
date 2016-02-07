/* @flow */

import UAX14 from 'linebreak'
import type { Placeholder } from '../utils/placeholders'
import {
  hyphenPlaceholder,
  freeBreakPlaceholder,
  eolGluePlaceholder,
  eolPenaltyPlaceholder
} from '../utils/placeholders'
const SOFT_HYPHEN = '\u{00AD}'

export default function uax14 (
  hyphenator: (string: string) => Array<string|Placeholder>
): (string: string) => Array<string|Placeholder> {

  return string => {

    const breaker = new UAX14(string)
    let lastBreak = { position: 0, required: false }
    let thisBreak = breaker.nextBreak()

    // if and only if we can't find any UAX14 breaks, we defer to a
    // automatic hyphenation algorithm specified by the caller
    if (thisBreak.position === string.length) {
      return hyphenator(string)
    }

    const segments = []
    while (thisBreak) {
      segments.push(string.slice(lastBreak.position, thisBreak.position))
      lastBreak = thisBreak
      thisBreak = breaker.nextBreak()
      if (lastBreak.required) {
        segments.push(eolGluePlaceholder)
        segments.push(eolPenaltyPlaceholder)
      } else if (thisBreak !== null) {
        if (string[lastBreak.position - 1] === SOFT_HYPHEN) {
          segments.push(hyphenPlaceholder)
        } else {
          segments.push(freeBreakPlaceholder)
        }
      }
    }
    return segments

  }

}
