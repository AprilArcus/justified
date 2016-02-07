import whiteSpace from './whiteSpace'
import uax14 from './uax14'
import hyphenatorPromise from '../word/hyphenatorPromise'
import flatten from '../utils/flatten'
import type { Glue, Penalty } from '../formattingObjects'
import { gluePlaceholder, hyphenPlaceholder } from '../utils/placeholders'

export default function segmentPromise (
  text: string,
  language: string
): Promise<
  Array<string|typeof gluePlaceholder|typeof hyphenPlaceholder|Glue|Penalty>> {

  return hyphenatorPromise(language)
    .then(hyphenate => {
      const uax14orHyphenate = uax14(hyphenate)
      return flatten(whiteSpace(text, uax14orHyphenate))
    })

}
