/* @flow */

import { ELEMENT_NODE } from '../utils/constants'
import httpEquivLang from '../utils/httpEquivLang'

export default function language (
  textNode: Text
): string {
  let node = textNode
  while (node) {
    if (node.nodeType === ELEMENT_NODE) {
      const lang = node.lang
      if (lang) return lang
      const xmlLang = node.getAttribute('xml:lang')
      if (xmlLang) return xmlLang
    }
    node = node.parentNode
  }
  return httpEquivLang() ||
    navigator.browserLanguage ||
    navigator.userLanguage ||
    navigator.systemLanguage ||
    (navigator.languages && navigator.languages[0]) ||
    navigator.language
}
