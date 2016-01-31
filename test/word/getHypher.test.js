import { hypherPromise } from '../../src/word/hypherPromise'
import { MemoizingHypher as Hypher } from '../../src/word/MemoizingHypher'

// TODO: Current module is a shim. Will be replaced by something that XHRs the
// modules from a remote server.

describe('hypherPromise()', () => {

  it('returns a promise', () => {
    expect(hypherPromise('en-us')).to.be.a(Promise)
  })

  it('resolves a named language', done => {
    hypherPromise('en-us').then(h => {
      expect(h).to.be.a(Hypher)
      done()
    })
  })

  it('resolves an aliased language', done => {
    hypherPromise('en').then(h => {
      expect(h).to.be.a(Hypher)
      done()
    })
  })

  it('rejects an unrecognized language', done => {
    hypherPromise('foo').catch(reason => {
      expect(reason).to.have.property('status', 404)
      done()
    })
  })

})
