/* @flow */

import type { Placeholder } from '../utils/placeholders'
import { gluePlaceholder } from '../utils/placeholders'

// https://www.w3.org/TR/CSS2/text.html#propdef-white-space

// The built in \s and \b character classes match a variety of non-breaking
// whitespace. Here we are interested specifically in breaking spaces
// without width semantics.
const regex = /([\t\n\f\r ]*)([^\t\n\f\r ]*)/g
// The control characters
//
//   U+000B LINE TABULATION,
//   U+0085 NEXT LINE,
//   U+2028 LINE SEPARATOR,
// and
//   U+2029 PARAGRAPH SEPARATOR,
//
// will not be consolidated into a glue run , but will survive until
// being parsed into a forced break by UAX 14.

export default function whiteSpace (
  split: (word: string) => Array<Placeholder|string>
): (text: string) => Array<Placeholder|string> {

  return text => {

    let match
    const out = []

    do {
      let whitespace // eslint-disable-line prefer-const
      let word // eslint-disable-line prefer-const

      [match, whitespace, word] = regex.exec(text)
      if (whitespace) out.push(gluePlaceholder)
      if (word) {
        const syllables = split(word)
        for (let i = 0, length = syllables.length; i < length; i++) {
          out.push(syllables[i])
        }
      }
    } while (match)

    regex.lastIndex = 0
    return out

  }

}
