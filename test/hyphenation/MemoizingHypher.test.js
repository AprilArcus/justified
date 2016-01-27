/* eslint-disable camelcase */

import { MemoizingHypher } from '../../src/hyphenation/MemoizingHypher'
import en from 'hyphenation.en-us'

describe('MemoizingHypher', () => {

  const Hypher = Object.getPrototypeOf(MemoizingHypher)
  const Hypher_prototype_hyphenate = Hypher.prototype.hyphenate
  const MemoizingHypher_prototype_hyphenate =
    MemoizingHypher.prototype.hyphenate
  const h = new MemoizingHypher(en)

  before(() => {
    Hypher.prototype.hyphenate = sinon.spy(Hypher.prototype.hyphenate)
    MemoizingHypher.prototype.hyphenate =
      sinon.spy(MemoizingHypher.prototype.hyphenate)
  })

  it('calls Hypher.prototype.hyphenate the first time it sees a word', () => {
    expect(h.hyphenate('enjambment')).to.eql(['en', 'jamb', 'ment'])
    expect(Hypher.prototype.hyphenate).to.be.calledOnce()
    expect(MemoizingHypher.prototype.hyphenate).to.be.calledOnce()
  })

  it('uses a cached value when called again with the same word', () => {
    expect(h.hyphenate('enjambment')).to.eql(['en', 'jamb', 'ment'])
    expect(Hypher.prototype.hyphenate).to.be.calledOnce()
    expect(MemoizingHypher.prototype.hyphenate).to.be.calledTwice()
  })

  after(() => {
    Hypher.prototype.hyphenate = Hypher_prototype_hyphenate
    MemoizingHypher.prototype.hyphenate = MemoizingHypher_prototype_hyphenate
  })

})
