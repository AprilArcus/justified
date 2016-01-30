/* @flow */
/* eslint-env commonjs */

import { MemoizingHypher as Hypher } from './MemoizingHypher'
import { getHyphenationPattern } from './getHyphenationPattern'
import { intersperse } from '../utils/intersperse'

const languages: { [key: string]: Hypher } = Object.create(null)

function hyphenateSync<T>(
  h: Hypher,
  hyphen: T,
  string: string,
): Array<string|T> {
  const syllables = h.hyphenate(string)
  return intersperse(syllables, hyphen)
}

export function curriedHyphenator<T>(
  language: string,
  hyphen: T
): Promise<(string: string) => Array<string|T>> {

  let h = languages[language]

  if (h) {
    return Promise.resolve(string => hyphenateSync(h, hyphen, string))
  }

  return getHyphenationPattern(language).then(pattern => {
    h = new Hypher(pattern)
    languages[language] = h
    return Promise.resolve(string => hyphenateSync(h, hyphen, string)) // eslint-disable-line max-nested-callbacks
  })

}
