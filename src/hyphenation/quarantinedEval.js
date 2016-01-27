/* @flow */
/* eslint no-warning-comments: 0,
          no-new-func: 0 */

// TODO: This would be unnecessary if the language patterns were hosted as
// JSON files rather than commonJS modules.

// "How to export a JavaScript module" by Andrea Giammarchi (@WebReflection)
// https://www.webreflection.co.uk/blog/2015/11/30/how-to-export-javascript-modules

export function quarantinedEval (script) {
  const exports = {}
  const module = { exports }
  const globals =
    Object.keys(window).filter(key => key !== '__core-js_shared__')

  Function.apply(null, globals.concat(['exports', 'module', script]))
    .apply(exports, globals.map(() => ({})).concat([exports, module]))

  return module.exports
}
