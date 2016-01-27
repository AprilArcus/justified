/* @flow */
/* global LanguagePattern */

import { evalQuarantined } from './evalQuarantined'

const OK = 200

export function getHyphenationPattern (
  languageCode: string
  ): Promise<LanguagePattern> {

  const url =
    `https://npmcdn.com/hyphenation.${languageCode}/lib/${languageCode}.js`

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function onload (progressEvent) {
      if (this.status === OK) {
        resolve(evalQuarantined(xhr.responseText))
      } else {
        reject({ status: this.status, statusText: xhr.statusText })
      }
    }
    xhr.onerror = function onerror (progressEvent) {
      reject({ status: this.status, statusText: xhr.statusText })
    }
    xhr.send()
  })

}
