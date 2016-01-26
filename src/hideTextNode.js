// n.b. using nonce properties on the text nodes would be faster
const originalData = new WeakMap()

export const hideTextNode = (node: Text): void => {
  originalData.set(node, node.data)
  // n.b. CharacterData#deleteData might be faster
  node.data = '' // eslint-disable-line no-param-reassign
}

export const restoreTextNode = (node: Text): void => {
  // n.b. CharacterData#appendData might be faster
  node.data = originalData.get(node) // eslint-disable-line no-param-reassign
}
