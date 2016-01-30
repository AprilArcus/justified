/* @flow */
/* eslint-env commonjs */

import { MemoizingHypher as Hypher } from './MemoizingHypher'
import type { Penalty } from '../formattingObjects'
import { getHyphenationPattern } from './getHyphenationPattern'
import intersperse from 'intersperse'

const languages: { [key: string]: Hypher } = Object.create(null)

export async function hyphenate(params: {
  language: string,
  string: string,
  hyphen: Penalty
}): Promise<Array<string|Penalty>> {

  const { language, string, hyphen } = params

  let h = languages[language]
  if (!h) {
    const pattern = await getHyphenationPattern(language)
    h = new Hypher(pattern)
    languages[language] = h
  }

  const syllables = h.hyphenate(string)
  return intersperse(syllables, hyphen)

}
