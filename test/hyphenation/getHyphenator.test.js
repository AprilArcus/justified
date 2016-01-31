import { getHyphenator } from '../../src/hyphenation/getHyphenator'
import { Penalty } from '../../src/formattingObjects'

describe('hyphenate', () => {

  const hyphen = new Penalty({
    width: 10,
    penalty: 100,
    flagged: true,
    value: '-',
    kern: 0
  })

  describe('when called with a valid language code', () => {

    it('returns a promise', () => {
      expect(getHyphenator('en', hyphen)).to.be.a(Promise)
    })

    it('resolves to a function', done => {
      getHyphenator('en', hyphen).then(hyphenate => {
        expect(hyphenate).to.be.a('function')
        done()
      })
    })

    it('hyphenates correctly', done => {
      getHyphenator('en', hyphen).then(hyphenate => {
        expect(hyphenate('enjambment'))
          .to.eql(['en', hyphen, 'jamb', hyphen, 'ment'])
        done()
      })
    })

  })

  describe('when called with an invalid language code', () => {

    it('returns a promise', () => {
      expect(getHyphenator('foo', hyphen)).to.be.a(Promise)
    })

    it('resolves to a function', done => {
      getHyphenator('foo', hyphen).then(hyphenate => {
        expect(hyphenate).to.be.a('function')
        done()
      })
    })

    it('returns the original string', done => {
      getHyphenator('foo', hyphen).then(hyphenate => {
        expect(hyphenate('enjambment'))
          .to.eql('enjambment')
        done()
      })
    })

  })

})
