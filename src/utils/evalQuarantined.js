/* @flow */

// https://www.webreflection.co.uk/blog/2015/11/30/how-to-export-javascript-modules
export function evalQuarantined (script: string): any {
  const exports = {}
  const module = { exports }
  new Function('exports', 'module', script).call(exports, exports, module) // eslint-disable-line no-new-func
  return module.exports
}
