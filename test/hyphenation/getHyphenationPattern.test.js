import { getHyphenationPattern } from '../../src/hyphenation/getHyphenationPattern'

/* eslint-disable no-warning-comments */

// TODO: Current module is a shim. Will be replaced by something that XHRs the
// modules from a remote server.

describe('getHyphenationPattern()', () => {

  it('returns a promise', () => {
    expect(getHyphenationPattern('en-us')).to.be.a(Promise)
  })

  it('resolves a named language pattern', done => {
    getHyphenationPattern('en-us').then(pattern => {
      expect(pattern).to.have.property('id')
      expect(pattern).to.have.property('leftmin')
      expect(pattern.leftmin).to.be.a('number')
      expect(pattern).to.have.property('rightmin')
      expect(pattern.rightmin).to.be.a('number')
      expect(pattern).to.have.property('patterns')
      expect(pattern.patterns).to.be.an('object')
      done()
    })
  })

  it('resolves an aliased language pattern', done => {
    getHyphenationPattern('en').then(pattern => {
      expect(pattern).to.have.property('id')
      expect(pattern).to.have.property('leftmin')
      expect(pattern.leftmin).to.be.a('number')
      expect(pattern).to.have.property('rightmin')
      expect(pattern.rightmin).to.be.a('number')
      expect(pattern).to.have.property('patterns')
      expect(pattern.patterns).to.be.an('object')
      done()
    })
  })

  it('rejects an unrecognized language pattern', done => {
    getHyphenationPattern('foo').catch(reason => {
      expect(reason).to.have.property('status', 404)
      done()
    })
  })

})
