/* @flow */

// for IE8
const SHOW_TEXT = window.NodeFilter && NodeFilter.SHOW_TEXT || 4 // eslint-disable-line no-magic-numbers

export default function textNodes (
  root: HTMLParagraphElement
): Array<Text> {

  const iterator = document.createNodeIterator(root, SHOW_TEXT)
  const nodes = []
  let node

  while (node = iterator.nextNode()) nodes.push(node) // eslint-disable-line no-cond-assign
  return nodes

}
