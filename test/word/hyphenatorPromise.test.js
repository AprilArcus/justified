import { hyphenatorPromise } from '../../src/word/hyphenatorPromise'
import { Penalty } from '../../src/formattingObjects'
import { hyphenPlaceholder } from '../../src/utils/placeholders'

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
      expect(hyphenatorPromise('en')).to.be.a(Promise)
    })

    it('resolves to a function', done => {
      hyphenatorPromise('en').then(hyphenate => {
        expect(hyphenate).to.be.a('function')
        done()
      })
    })

    it('hyphenates correctly', done => {
      hyphenatorPromise('en').then(hyphenate => {
        expect(hyphenate('enjambment'))
          .to.eql(['en', hyphenPlaceholder, 'jamb', hyphenPlaceholder, 'ment'])
        done()
      })
    })

  })

  describe('when called with an invalid language code', () => {

    it('returns a promise', () => {
      expect(hyphenatorPromise('foo')).to.be.a(Promise)
    })

    it('resolves to a function', done => {
      hyphenatorPromise('foo').then(hyphenate => {
        expect(hyphenate).to.be.a('function')
        done()
      })
    })

    it('returns the original string', done => {
      hyphenatorPromise('foo').then(hyphenate => {
        expect(hyphenate('enjambment'))
          .to.eql('enjambment')
        done()
      })
    })

  })

})