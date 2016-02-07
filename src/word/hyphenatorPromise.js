/* @flow */
/* eslint-env commonjs */

import { MemoizingHypher as Hypher } from './MemoizingHypher'
import languagePatternPromise from './languagePatternPromise'
import intersperse from '../utils/intersperse'
import pureArray from '../utils/pureArray'
import type { Placeholder } from '../utils/placeholders'
import { hyphenPlaceholder } from '../utils/placeholders'

const languages = Object.create(null)

export default function hyphenatorPromise (
  language: string
): Promise<(string: string) => Array<string|Placeholder>> {

  let promise = languages[language]

  if (!promise) {
    promise =
      languagePatternPromise(language)
      .then(pattern => {
        const h = new Hypher(pattern)
        return string => intersperse(h.hyphenate(string), hyphenPlaceholder)
      })
      .catch(() => pureArray)
    languages[language] = promise
  }

  return promise

}
