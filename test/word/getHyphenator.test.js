import { hyphenatorPromise } from '../../src/word/hyphenatorPromise'
import { Penalty } from '../../src/formattingObjects'

describe('hyphenatorPromise()', () => {

  const hyphen = new Penalty({
    width: 10,
    penalty: 100,
    flagged: true,
    value: '-',
    kern: 0
  })

  describe('when called with a valid language code', () => {

    it('returns a promise', () => {
      expect(hyphenatorPromise('en', hyphen)).to.be.a(Promise)
    })

    it('resolves to a function', done => {
      hyphenatorPromise('en', hyphen).then(hyphenate => {
        expect(hyphenate).to.be.a('function')
        done()
      })
    })

    it('hyphenates correctly', done => {
      hyphenatorPromise('en', hyphen).then(hyphenate => {
        expect(hyphenate('enjambment'))
          .to.eql(['en', hyphen, 'jamb', hyphen, 'ment'])
        done()
      })
    })

  })

  describe('when called with an invalid language code', () => {

    it('returns a promise', () => {
      expect(hyphenatorPromise('foo', hyphen)).to.be.a(Promise)
    })

    it('resolves to a function', done => {
      hyphenatorPromise('foo', hyphen).then(hyphenate => {
        expect(hyphenate).to.be.a('function')
        done()
      })
    })

    it('returns the original string', done => {
      hyphenatorPromise('foo', hyphen).then(hyphenate => {
        expect(hyphenate('enjambment'))
          .to.eql('enjambment')
        done()
      })
    })

  })

})
