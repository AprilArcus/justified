import { curriedHyphenator } from '../../src/hyphenation/curriedHyphenator'
import { Penalty } from '../../src/formattingObjects'
import { MemoizingHypher as Hypher } from '../../src/hyphenation/MemoizingHypher'

describe('hyphenate', () => {

  const hyphen = new Penalty({
    width: 10,
    penalty: 100,
    flagged: true,
    value: '-',
    kern: 0
  })

  it('returns a promise', () => {
    expect(curriedHyphenator('en', hyphen)).to.be.a(Promise)
  })

  it('resolves to the expected value', done => {
    // curriedHyphenator('en', hyphen).then(hyphenate => {
    //   expect(hyphenate('enjambment'))
    //     .to.eql(['en', hyphen, 'jamb', hyphen, 'ment'])
    //   done()
    // })
    curriedHyphenator('en', hyphen).then(hyphenate => {
      expect(hyphenate).to.be.ok()
      expect(hyphenate).to.be.a('function')
      const syllables = hyphenate('enjambment')
      expect(syllables).to.eql(['en', hyphen, 'jamb', hyphen, 'ment'])
      done()
    })
  })

  // it('rejects if supplied with a nonexistent language', done => {
  //   hyphenate({
  //     language: 'foo',
  //     string: 'enjambment',
  //     hyphen
  //   }).catch(reason => {
  //     expect(reason).to.have.property('status', 404)
  //     done()
  //   })
  // })

})
