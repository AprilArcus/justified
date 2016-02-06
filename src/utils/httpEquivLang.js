const headNodes = document.head.childNodes
let searched = false
let cached
// for IE8, where window.Node is undefined
const ELEMENT_NODE = Node && Node.ELEMENT_NODE || 1

export function httpEquivLang(): ?string {
  if (!searched) {
    searched = true
    for (let i = 0, length = headNodes.length; i < length; i++) {
      const headNode = headNodes[i]
      if (headNode.nodeType === ELEMENT_NODE &&
          headNode.nodeName.toLowerCase() === 'meta' &&
          headNode.httpEquiv.toLowerCase() === 'content-language') {
        cached = headNode.content.split(',')[0]
        break
      }
    }
  }
  return cached
}
