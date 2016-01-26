/* eslint-env browser */
/* eslint max-params: 0,
          max-nested-callbacks: 0,
          no-invalid-this: 0 */

(function (f) {
  window.setTimeout = f(window.setTimeout)
  window.setInterval = f(window.setInterval)
})(
  function (f) {
    return function (c, t) {
      var a = [].slice.call(arguments, 2)
      return f(function () {
        c.apply(this, a)
      }, t)
    }
  }
)
