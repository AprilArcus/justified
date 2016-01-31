import { whiteSpace } from './whiteSpace'
import { uax14 } from './uax14'
import { getHyphenator } from '../hyphenation/getHyphenator'
import { flatten } from '../utils/flatten'
import { EOL_GLUE, EOL_PENALTY, FREE_BREAK } from '../formattingObjects'

export function getFormattingObjects<GluePlaceHolderT, HyphenPlaceHolderT>(
  text: string,
  language: string,
  glue: GlueT,
  hyphen: HyphenT
): Promise<
  Array<
    string|
    GluePlaceHolderT|
    HyphenPlaceHolderT|
    typeof EOL_GLUE|
    typeof EOL_PENALTY|
    typeof FREE_BREAK
  >
> {

  return getHyphenator(language, hyphen).then(hyphenateWithDelimiter => {
    const hyphenate = hyphenateWithDelimiter(hyphen)
    const uax14orHyphenate = uax14(hyphen, hyphenate)
    return flatten(whiteSpace(text, glue, uax14orHyphenate))
  })

}
