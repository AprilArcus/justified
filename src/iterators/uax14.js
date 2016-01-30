/* @flow */

import UAX14 from 'linebreak'

import type { Glue, Penalty } from '../formattingObjects'
import { EOL_GLUE, EOL_PENALTY, FREE_BREAK } from '../formattingObjects'

const SOFT_HYPHEN = '\u{00AD}'

export function uax14( // eslint-disable-line max-params
  string: string,
  hyphenator: (string: string, hyphen: Penalty) => Array<string|Penalty|Glue>,
  hyphen: Penalty
  ): Array<string|Penalty|Glue> {

  const breaker = new UAX14(string)
  let lastBreak = { position: 0, required: false }
  let thisBreak = breaker.nextBreak()

  // if and only if we can't find any UAX14 breaks, we defer to a
  // automatic hyphenation algorithm specified by the caller
  if (thisBreak.position === string.length) return hyphenator(string, hyphen)

  const segments = []
  while (thisBreak) {
    segments.push(string.slice(lastBreak.position, thisBreak.position))
    lastBreak = thisBreak
    thisBreak = breaker.nextBreak()
    if (lastBreak.required) {
      segments.push(EOL_GLUE)
      segments.push(EOL_PENALTY)
    } else if (thisBreak !== null) {
      if (string[lastBreak.position - 1] === SOFT_HYPHEN) {
        segments.push(hyphen)
      } else {
        segments.push(FREE_BREAK)
      }
    }
  }
  return segments

}
