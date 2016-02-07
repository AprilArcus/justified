import id from '../../src/utils/id'

describe('id()', () => {

  it('is a function', () => {
    expect(id).to.be.a('function')
  })

  it('returns its argument', () => {
    const arg = {}
    expect(id(arg)).to.be(arg)
  })

})
