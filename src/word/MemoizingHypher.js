/* @flow */
/* global LanguagePattern */

import Hypher from 'hypher'

export class MemoizingHypher extends Hypher {

  memos: { [key: string]: Array<string> } = Object.create(null);

  constructor(language: LanguagePattern): void {
    super(language)
  }

  hyphenate(string: string): Array<string> {
    if (!(string in this.memos)) this.memos[string] = super.hyphenate(string)
    return this.memos[string]
  }

}
