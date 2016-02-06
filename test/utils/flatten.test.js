import { flatten } from '../../src/utils/flatten'

describe('flatten()', () => {

  function DO() {
    return 'DO'
  }
  const RE = function RE() { return 'RE' } // eslint-disable-line func-style, brace-style
  const MI = () => 'MI'

  const you = { you: 'you' }
  function Me() { this.me = 'me' } // eslint-disable-line brace-style
  const me = new Me()


  it('is a function', () => {
    expect(flatten).to.be.a('function')
  })

  it('returns an empty array given an empty array', () => {
    expect(flatten([])).to.eql([])
  })

  it('returns an unchanged array given an array of strings', () => {
    expect(flatten(['a', 'b', 'c'])).to.eql(['a', 'b', 'c'])
  })

  it('...or numbers', () => {
    expect(flatten([1, 2, 3])).to.eql([1, 2, 3])
  })

  it('...or functions', () => {
    expect(flatten([DO, RE, MI])).to.eql([DO, RE, MI])
  })

  it('...or objects', () => {
    expect(flatten([you, me])).to.eql([you, me])
  })

  it('...or other primitives', () => {
    expect(flatten([true, false, null]))
      .to.eql([true, false, null])
  })

  it('returns an flattened array given an array of arrays', () => {
    expect(flatten([ ['a', 'b', 'c'], [DO, RE, MI], [1, 2, 3], [you, me] ]))
      .to.eql(['a', 'b', 'c', DO, RE, MI, 1, 2, 3, you, me])
  })

  it('...or array-likes', () => {
    expect(flatten([
      { 0: 'a', 1: 'b', 2: 'c', length: 3 },
      { 0: DO,  1: RE,  2: MI,  length: 3 }, // eslint-disable-line no-multi-spaces
      { 0: 1,   1: 2,   2: 3,   length: 3 }, // eslint-disable-line no-multi-spaces
      { 0: you, 1: me,          length: 2 } // eslint-disable-line no-multi-spaces
    ])).to.eql(['a', 'b', 'c', DO, RE, MI, 1, 2, 3, you, me])
  })

  it('skips an empty array', () => {
    expect(flatten([ ['a', 'b', 'c'], [], [DO, RE, MI], [1, 2, 3], [you, me] ]))
      .to.eql(['a', 'b', 'c', DO, RE, MI, 1, 2, 3, you, me])
  })

  it('skips a hole in the outer array', () => {
    expect(flatten(['a', , 'b', , 'c'])) // eslint-disable-line no-sparse-arrays
      .to.eql(['a', 'b', 'c'])
  })

  if (0 in [undefined]) {
    it('distinguishes undefined from a hole in an inner array', () => {
      expect(flatten([ ['a', undefined, 'b', , 'c'] ]))  // eslint-disable-line no-sparse-arrays
        .to.eql(['a', undefined, 'b', 'c'])
    })
  }

})
