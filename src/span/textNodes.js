/* @flow */

export function textNodes(root: HTMLParagraphElement): Array<Text> {

  const iterator = document.createNodeIterator(root, NodeFilter.SHOW_TEXT)
  const nodes = []
  let node

  while (node = iterator.nextNode()) nodes.push(node) // eslint-disable-line no-cond-assign
  return nodes

}
