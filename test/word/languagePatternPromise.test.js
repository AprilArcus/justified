import { languagePatternPromise } from '../../src/word/languagePatternPromise'

// TODO: Current module is a shim. Will be replaced by something that XHRs the
// modules from a remote server.

describe('hypherPromise()', () => {

  it('returns a promise', () => {
    expect(languagePatternPromise('en-us')).to.be.a(Promise)
  })

  it('resolves a named language', done => {
    languagePatternPromise('en-us').then(pattern => {
      expect(pattern).to.be.an('object')
      expect(pattern).to.have.property('id')
      expect(pattern).to.have.property('leftmin')
      expect(pattern).to.have.property('rightmin')
      expect(pattern).to.have.property('patterns')
      done()
    })
  })

  it('resolves an aliased language', done => {
    languagePatternPromise('en').then(pattern => {
      expect(pattern).to.be.an('object')
      expect(pattern).to.have.property('id')
      expect(pattern).to.have.property('leftmin')
      expect(pattern).to.have.property('rightmin')
      expect(pattern).to.have.property('patterns')
      done()
    })
  })

  it('rejects an unrecognized language', done => {
    languagePatternPromise('foo').catch(reason => {
      expect(reason).to.have.property('status', 404)
      done()
    })
  })

})
