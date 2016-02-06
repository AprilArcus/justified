const headNodes = document.head.childNodes
let searched = false
let cached

// for IE8
// const ELEMENT_NODE = window.Node && Node.ELEMENT_NODE || 1
const ELEMENT_NODE = Node.ELEMENT_NODE

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
