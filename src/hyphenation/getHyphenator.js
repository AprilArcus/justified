/* @flow */
/* eslint-env commonjs */

import { MemoizingHypher as Hypher } from './MemoizingHypher'
import { getHyphenationPattern } from './getHyphenationPattern'
import { intersperse } from '../utils/intersperse'

const languages: { [key: string]: Hypher } = Object.create(null)

function hyphenateSync<T>(
  h: Hypher,
  hyphen: T,
  string: string
): Array<string|T> {
  const syllables = h.hyphenate(string)
  return intersperse(syllables, hyphen)
}

export function getHyphenator<T>(
  language: string,
  hyphen: T
): Promise<(string: string) => Array<string|T>|string> {

  let h = languages[language]

  if (h) {
    return Promise.resolve(string => hyphenateSync(h, hyphen, string))
  }

  return getHyphenationPattern(language).then(pattern => {
    h = new Hypher(pattern)
    languages[language] = h
    return string => hyphenateSync(h, hyphen, string)
  }).catch(_ => string => string)

}
