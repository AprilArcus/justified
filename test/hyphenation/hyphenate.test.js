import { hyphenate } from '../../src/hyphenation/hyphenate'
import { Penalty } from '../../src/formattingObjects'

describe('hyphenate', () => {

  const hyphen = new Penalty({
    width: 10,
    penalty: 100,
    flagged: true,
    value: '-',
    kern: 0
  })

  it('returns a promise', () => {
    expect(hyphenate({
      language: 'en',
      string: 'enjambment',
      hyphen
    })).to.be.a(Promise)
  })

  it('resolves to the expected value', done => {
    hyphenate({
      language: 'en',
      string: 'enjambment',
      hyphen
    }).then(hyphenated => {
      expect(hyphenated).to.eql(['en', hyphen, 'jamb', hyphen, 'ment'])
      done()
    })
  })

  it('rejects if supplied with a nonexistent language', done => {
    hyphenate({
      language: 'foo',
      string: 'enjambment',
      hyphen
    }).catch(reason => {
      expect(reason).to.have.property('status', 404)
      done()
    })
  })

})
