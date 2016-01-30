/* @flow */

import { Glue, Box, Penalty } from '../formattingObjects'
import { whiteSpace } from './whiteSpace'
import { uax14 } from './uax14'
import { curriedHyphenator } from '../hyphenation/curriedHyphenator'
import { flatten } from '../utils/flatten'

export function formatInline(textNode: Text): Promise<Array<Glue|Box|Penalty>> {

  const glue = new Glue({
    width: 0,
    stretch: 0,
    shrink: 0
  })

  const hyphen = new Penalty({
    width: 0,
    penalty: 0,
    flagged: true,
    value: '-',
    kern: 0
  })

  const language = 'en'

  curriedHyphenator(language).then(hyphenateWithDelimiter => {

  })

  return Promise.all(whiteSpace({ string: textNode.data, glue }).map(e => {
    if (e === glue) return e
    return uax14({ string: e, hyphenator, hyphen })
  })).then(flatten)

}
