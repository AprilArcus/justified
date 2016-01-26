/* @flow */
/* global LanguagePattern */

import Hypher from 'hypher'

export class MemoizingHypher extends Hypher {

  memos: {[key: string]: Array<string>};

  constructor (
    language: LanguagePattern,
    memos: { [key: string]: Array<string> }
  ): void {
    super(language)
    this.memos = memos
  }

  hyphenate (string: string): Array<string> {
    if (!(string in this.memos)) this.memos[string] = super.hyphenate(string)
    return this.memos[string]
  }

}
