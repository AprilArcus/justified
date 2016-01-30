import { intersperse } from '../../src/utils/intersperse'

describe('intersperse()', () => {

  it('should be a function', () => {
    expect(intersperse).to.be.a('function')
  })

  it('should return an empty array given an empty array', () => {
    expect(intersperse([], '-')).to.eql([])
  })

  it('should return an unchanged array given an array of length 1', () => {
    expect(intersperse(['hello'], '-')).to.eql(['hello'])
  })

  it('should return an array of length 2n-1 given an array of length n', () => {
    expect(intersperse([1, 2], '-').length).to.be(3)
    expect(intersperse([1, 2, 3], '-').length).to.be(5)
    expect(intersperse([1, 2, 3, 5], '-').length).to.be(7)
  })

  it('should intersperse a delimiter', () => {
    expect(intersperse(['hello', 'world'], '-'))
      .to.eql(['hello', '-', 'world'])
    expect(intersperse(['life', 'the universe', 'and everything'], ', '))
      .to.eql(['life', ', ', 'the universe', ', ', 'and everything'])
  })

})
