import language from '../../src/span/language'
import { reset } from '../../src/utils/httpEquivLang'

describe('language(textNode) finds a language...', () => {

  const p1 = document.createElement('p')
  p1.setAttribute('lang', 'en-us')
  const text1 = document.createTextNode('To pass this test is a ')
  p1.appendChild(text1)
  const span = document.createElement('span')
  span.setAttribute('lang', 'fr')
  const text2 = document.createTextNode('tour de force ')
  span.appendChild(text2)
  p1.appendChild(span)
  const text3 = document.createTextNode(' of which very few are capable')
  p1.appendChild(text3)

  const p2 = document.createElement('p')
  const text4 = document.createTextNode(
    'what do you call someone who speaks one language?'
  )
  p2.appendChild(text4)

  before(() => {
    document.body.appendChild(p1)
    document.body.appendChild(p2)
  })

  beforeEach(reset)

  describe('when document.head has no language metadata...', () => {

    it('in a <p />', () => {
      expect(language(text4)).to.be.ok()
    })

    it('in a <p lang="" />', () => {
      expect(language(text1)).to.be('en-us')
    })

    it('in a <p lang=""><span lang="" /></p>', () => {
      expect(language(text2)).to.be('fr')
    })

  })

  describe('when document.head has language metadata...', () => {

    const meta = document.createElement('meta')
    meta.setAttribute('http-equiv', 'Content-Language')
    meta.setAttribute('content', 'de')

    before(() => {
      document.head.appendChild(meta)
    })

    it('in a <p />', () => {
      expect(language(text4)).to.be('de')
    })

    it('in a <p lang="" />', () => {
      expect(language(text1)).to.be('en-us')
    })

    it('in a <p lang=""><span lang="" /></p>', () => {
      expect(language(text2)).to.be('fr')
    })

    after(() => {
      document.head.removeChild(meta)
    })

  })

  after(() => {
    document.body.removeChild(p1)
    document.body.removeChild(p2)
  })

})
