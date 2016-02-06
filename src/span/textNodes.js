/* @flow */

// for IE8, where we can't count on NodeFilter being polyfilled
const SHOW_TEXT = NodeFilter && NodeFilter.SHOW_TEXT || 4 // eslint-disable-line no-magic-numbers

export function textNodes(root: HTMLParagraphElement): Array<Text> {

  const iterator = document.createNodeIterator(root, SHOW_TEXT)
  const nodes = []
  let node

  while (node = iterator.nextNode()) nodes.push(node) // eslint-disable-line no-cond-assign
  return nodes

}
