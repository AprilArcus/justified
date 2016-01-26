/* @flow */
/* eslint func-style: [2, "declaration"],
          no-var: 0,
          no-cond-assign: 0
*/

const SHOW_TEXT = 4 // = NodeFilter.SHOW_TEXT

export function textNodes (root: HTMLParagraphElement): Array<Text> {

  var iterator = document.createNodeIterator(root, SHOW_TEXT)
    , nodes = []
    , node

  while (node = iterator.nextNode()) nodes.push(node)
  return nodes

}
