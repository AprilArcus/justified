/* eslint-env commonjs */

let httpEquivLang

describe('httpEquivLang()', () => {

  beforeEach(() => {
    httpEquivLang = require('../../src/utils/httpEquivLang').httpEquivLang
  })

  afterEach(() => {
    delete require.cache[require.resolve('../../src/utils/httpEquivLang')]
  })

  it('is a function', () => {
    expect(httpEquivLang).to.be.a('function')
  })

  describe('when no matching meta tag is found', () => {

    it('returns falsey', () => {
      expect(httpEquivLang()).to.not.be.ok()
    })

  })

  describe('when an matching meta tag is found', () => {

    let meta

    before(() => {
      meta = document.createElement('meta')
      meta.setAttribute('http-equiv', 'Content-Language')
      meta.setAttribute('content', 'en')
      document.head.appendChild(meta)
    })

    it('returns the language', () => {
      expect(httpEquivLang()).to.be('en')
    })

    after(() => {
      document.head.removeChild(meta)
    })

  })

  describe('when two matching meta tags are found', () => {

    let meta1
    let meta2

    before(() => {
      meta1 = document.createElement('meta')
      meta1.setAttribute('http-equiv', 'Content-Language')
      meta1.setAttribute('content', 'en')
      document.head.appendChild(meta1)
      meta2 = document.createElement('meta')
      meta2.setAttribute('http-equiv', 'Content-Language')
      meta2.setAttribute('content', 'es')
      document.head.appendChild(meta2)
    })

    it('returns the first language', () => {
      expect(httpEquivLang()).to.be('en')
    })

    after(() => {
      document.head.removeChild(meta1)
      document.head.removeChild(meta2)
    })

  })

  describe('when an matching meta tag encodes two languages', () => {

    let meta

    before(() => {
      meta = document.createElement('meta')
      meta.setAttribute('http-equiv', 'Content-Language')
      meta.setAttribute('content', 'en,es')
      document.head.appendChild(meta)
    })

    it('returns the language', () => {
      expect(httpEquivLang()).to.be('en')
    })

    after(() => {
      document.head.removeChild(meta)
    })

  })


})
