/* @flow */

declare class String {
  static raw(): string
}

export function dedent (...args: Array<any>): string { // eslint-disable-line func-style
  return String.raw(...args)
    .replace(/^(\s*)/, '')
    .replace(/((\s)*\n(\s)*)/g, ' ')
    .replace(/(\s*)$/, '')
}
