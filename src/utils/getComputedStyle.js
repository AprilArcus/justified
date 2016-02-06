/* @flow */

// Motivation: We want to use getComputedStyle to obtain subpixel precise
// measurements of text boxes in modern browsers. IE8 does not implement
// window.getComputedStyle, and a complete and accurate polyfill is perforce
// both bulky and slow. We can get by with a minimalist version instead.

let gcs

// built in methods have no prototype, so if getComputedStyle.prototype is
// truthy we conclude that it has been polyfilled.
// https://gist.github.com/jdalton/5e34d890105aca44399f#gistcomment-1283831
if (!window.getComputedStyle || window.getComputedStyle.prototype) {
  gcs = function getComputedStyle(elt: HTMLElement, pseudoElt?: string): any {
    return { width: pseudoElt ? 0 : elt.offsetWidth } // eslint-disable-line no-ternary
  }
} else {
  gcs = window.getComputedStyle
}

export { gcs as getComputedStyle }
