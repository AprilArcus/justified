import { whiteSpace } from './whiteSpace'
import { uax14 } from './uax14'
import { hyphenatorPromise } from '../word/hyphenatorPromise'
import { flatten } from '../utils/flatten'
import type { Glue, Penalty } from '../formattingObjects'

export function segmentPromise<GluePlaceHolderT, HyphenPlaceHolderT>(
  text: string,
  language: string,
  gluePlaceholder: GluePlaceHolderT,
  hyphenPlaceholder: HyphenPlaceHolderT
): Promise<
  Array<string|GluePlaceHolderT|HyphenPlaceHolderT|Glue|Penalty>> {

  return hyphenatorPromise(language, hyphenPlaceholder)
    .then(hyphenateWithDelimiter => {
      const hyphenate = hyphenateWithDelimiter(hyphenPlaceholder)
      const uax14orHyphenate = uax14(hyphenPlaceholder, hyphenate)
      return flatten(whiteSpace(text, gluePlaceholder, uax14orHyphenate))
    })

}
