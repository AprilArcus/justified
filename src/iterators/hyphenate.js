/* @flow */
/* eslint-env commonjs */

import { MemoizingHypher as Hypher } from '../classes/MemoizingHypher'
import type { Penalty } from '../formattingObjects'
import { evalQuarantined } from '../utils/evalQuarantined'
import intersperse from 'intersperse'
const OK = 200

const languages: {[key: string]: Hypher} = Object.create(null)

export const hyphenate = async ( // eslint-disable-line max-params
  language: string,
  string: string,
  hyphen: Penalty
): Promise<Array<string|Penalty>> => {

  let h = languages[language]
  if (!h) {
    const url = `https://npmcdn.com/hyphenation.${language}/lib/${language}.js`
    const source = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.onload = () => {
        if (xhr.status === OK) {
          resolve(xhr.responseText)
        } else {
          reject({ status: xhr.status, statusText: xhr.statusText })
        }
      }
      xhr.onerror = () => {
        reject({ status: xhr.status, statusText: xhr.statusText })
      }
      xhr.send()
    })
    const pattern = evalQuarantined(source)
    h = new Hypher(pattern)
    languages[language] = h
  }

  const syllables = h.hyphenate(string)
  return intersperse(syllables, hyphen)

}
