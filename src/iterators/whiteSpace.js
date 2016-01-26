import { Glue } from '../formattingObjects'

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

export const whiteSpace = function* whiteSpace ( // eslint-disable-line max-params
  string: string,
  glue: Glue
  ): Generator<string|Glue, void, void> {

  let match

  do {
    let whitespace // eslint-disable-line prefer-const
    let segment // eslint-disable-line prefer-const

    [match, whitespace, segment] = regex.exec(string)
    if (whitespace) yield glue
    if (segment) yield segment
  } while (match)

  regex.lastIndex = 0

}
