import { httpEquivLang } from '../utils/httpEquivLang'

export function language(textNode: Text): string {
  let n = textNode
  while (n = n.parentNode) { // eslint-disable-line no-cond-assign
    const lang = n.lang
    if (lang) return lang
    const xmlLang = n.getAttribute('xml:lang')
    if (xmlLang) return xmlLang
  }
  return httpEquivLang() ||
    navigator.browserLanguage ||
    navigator.userLanguage ||
    navigator.systemLanguage ||
    (navigator.languages && navigator.languages[0]) ||
    navigator.language
}
