import pureArray from '../../src/utils/pureArray'

describe('pureArray()', () => {

  it('is a function', () => {
    expect(pureArray).to.be.a('function')
  })

  it('returns its argument wrapped in an array', () => {
    const arg = {}
    expect(pureArray(arg)).to.eql([arg])
  })

})
