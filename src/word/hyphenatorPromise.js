/* @flow */
/* eslint-env commonjs */

import { MemoizingHypher as Hypher } from './MemoizingHypher'
import { languagePatternPromise } from './languagePatternPromise'
import { intersperse } from '../utils/intersperse'
import { id } from '../utils/id'
import { hyphenPlaceholder } from '../utils/placeholders'

const languages = Object.create(null)

export function hyphenatorPromise(
  language: string
): Promise<(string: string) => Array<string|typeof hyphenPlaceholder>|string> {

  let promise = languages[language]

  if (!promise) {
    promise =
      languagePatternPromise(language)
      .then(pattern => {
        const h = new Hypher(pattern)
        return string => intersperse(h.hyphenate(string), hyphenPlaceholder)
      })
      .catch(() => id)
    languages[language] = promise
  }

  return promise

}
