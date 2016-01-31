/* @flow */

import UAX14 from 'linebreak'
import { EOL_GLUE, EOL_PENALTY, FREE_BREAK } from '../formattingObjects'

const SOFT_HYPHEN = '\u{00AD}'

export function uax14<HyphenPlaceholderT>( // eslint-disable-line max-params
  hyphen: HyphenPlaceholderT,
  hyphenator: (string: string) => Array<string|HyphenPlaceholderT>
): (string: string) => Array<
  string|
  HyphenPlaceholderT|
  typeof EOL_GLUE|
  typeof EOL_PENALTY|
  typeof FREE_BREAK
> {

  return string => {

    const breaker = new UAX14(string)
    let lastBreak = { position: 0, required: false }
    let thisBreak = breaker.nextBreak()

    // if and only if we can't find any UAX14 breaks, we defer to a
    // automatic hyphenation algorithm specified by the caller
    if (thisBreak.position === string.length) {
      return (
        hyphenator(string, hyphen):
        Array<
          string|
          HyphenPlaceholderT|
          typeof EOL_GLUE|
          typeof EOL_PENALTY|
          typeof FREE_BREAK
        >
      )
    }

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

}
