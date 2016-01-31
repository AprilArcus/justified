/* @flow */
/* eslint-env commonjs */

import { MemoizingHypher as Hypher } from './MemoizingHypher'
import { hypherPromise } from './hypherPromise'
import { intersperse } from '../utils/intersperse'
import { id } from '../utils/id'

const languages: { [key: string]: Promise<Hypher> } = Object.create(null)

export function hyphenatorPromise<HyphenPlaceholderT>(
  language: string,
  hyphenPlaceholder: HyphenPlaceholderT
): Promise<(string: string) => Array<string|HyphenPlaceholderT>|string> {

  let promise = languages[language]

  if (!promise) {
    promise = hypherPromise(language)
    languages[language] = promise
  }

  return (
    promise
      .then(h => string => {
        const syllables = h.hyphenate(string)
        return intersperse(syllables, hyphenPlaceholder)
      })
      .catch(() => id)
  )

}
