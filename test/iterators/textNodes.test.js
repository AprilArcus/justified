import { textNodes } from '../../src/iterators/textNodes'

describe('iterating over text nodes', () => {

  const p = document.createElement('p')
  p.innerHTML = 'Lorem <em>ipsum dolor <strong>sit amet</strong></em>, consectetur adipiscing elit' // eslint-disable-line max-len

  it('should find only text nodes', () => {
    for (const node of textNodes(p)) {
      expect(node).to.be.a(Text)
      expect(node).not.to.be.a(HTMLElement)
    }
  })

  it('should find every text node', () => {
    expect(
      textNodes(p).map(node => node.data).join('')
    ).to.equal(p.textContent)
  })

  it('every text node should be mounted in the DOM', () => {
    for (const node of textNodes(p)) {
      expect(node.parentNode).to.be.ok()
    }
  })

})
