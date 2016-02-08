/* @flow */

/**
 * This function is a frustrating source of complexity.
 *
 * 1.) In .catch(), we could return (v) => v  instead of (v) => [v] at the
 *     expense of some complication to the type system. The return value will
 *     ultimately be flattened anyway, so the array allocation is pure waste.
 *
 * 2.) Most of the time, h.hyphenate() will be available synchronously. Since
 *     this function has no side effects, we might be able to extract some
 *     additional efficiencies by unleashing Zalgo.
 *
 * 3.) Alternatively, we could return an Observable instead of a Promise which
 *     switches from identity to hyphenate once the language pattern resolves
 *     and the hypher instance becomes available.
 */

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
