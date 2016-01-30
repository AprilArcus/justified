/* @flow */
/* global LanguagePattern */
/* eslint-env commonjs */

const patterns: { [key: string]: LanguagePattern } = {
  be: require('hyphenation.be'),
  bn: require('hyphenation.bn'),
  ca: require('hyphenation.ca'),
  cs: require('hyphenation.cs'),
  da: require('hyphenation.da'),
  de: require('hyphenation.de'),
  'el-monoton': require('hyphenation.el-monoton'),
  'el-polyton': require('hyphenation.el-polyton'),
  'en-gb': require('hyphenation.en-gb'),
  'en-us': require('hyphenation.en-us'),
  es: require('hyphenation.es'),
  fi: require('hyphenation.fi'),
  fr: require('hyphenation.fr'),
  grc: require('hyphenation.grc'),
  gu: require('hyphenation.gu'),
  hi: require('hyphenation.hi'),
  hu: require('hyphenation.hu'),
  hy: require('hyphenation.hy'),
  it: require('hyphenation.it'),
  kn: require('hyphenation.kn'),
  la: require('hyphenation.la'),
  lt: require('hyphenation.lt'),
  lv: require('hyphenation.lv'),
  ml: require('hyphenation.ml'),
  'nb-no': require('hyphenation.nb-no'),
  nl: require('hyphenation.nl'),
  or: require('hyphenation.or'),
  pa: require('hyphenation.pa'),
  pl: require('hyphenation.pl'),
  pt: require('hyphenation.pt'),
  ru: require('hyphenation.ru'),
  sk: require('hyphenation.sk'),
  sl: require('hyphenation.sl'),
  sv: require('hyphenation.sv'),
  ta: require('hyphenation.ta'),
  te: require('hyphenation.te'),
  tr: require('hyphenation.tr'),
  uk: require('hyphenation.uk')
}

patterns.en = patterns['en-us']
patterns.el = patterns['el-monoton']
patterns.nb = patterns['nb-no']
patterns.no = patterns['nb-no']

const NOT_FOUND = 404

export function getHyphenationPattern(
  language: string
): Promise<LanguagePattern> {
  if (patterns[language]) return Promise.resolve(patterns[language])
  return Promise.reject({ status: NOT_FOUND })
}
