// import flatten from '../../src/utils/flatten'

// describe('flatten()', () => {

//   /* eslint-disable brace-style, func-style */
//   function DO () { return 'DO' }
//   const RE = function RE () { return 'RE' }
//   const MI = () => 'MI'

//   const you = { you: 'you' }
//   function Me () { this.me = 'me' }
//   const me = new Me()
//   /* eslint-enable brace-style, func-style */

//   it('is a function', () => {
//     expect(flatten).to.be.a('function')
//   })

//   it('returns an empty array given an empty array', () => {
//     expect(flatten([])).to.eql([])
//   })

//   it.skip('returns an unchanged array given an array of strings', () => {
//     expect(flatten(['a', 'b', 'c'])).to.eql(['a', 'b', 'c'])
//   })

//   it('...or numbers', () => {
//     expect(flatten([1, 2, 3])).to.eql([1, 2, 3])
//   })

//   it.skip('...or functions', () => {
//     expect(flatten([DO, RE, MI])).to.eql([DO, RE, MI])
//   })

//   it.skip('...or objects', () => {
//     expect(flatten([you, me])).to.eql([you, me])
//   })

//   it.skip('...or other primitives', () => {
//     expect(flatten([true, false, null])).to.eql([true, false, null])
//   })

//   it('returns an flattened array given an array of arrays', () => {
//     expect(flatten([ ['a', 'b', 'c'], [DO, RE, MI], [1, 2, 3], [you, me] ]))
//       .to.eql(['a', 'b', 'c', DO, RE, MI, 1, 2, 3, you, me])
//   })

//   it('...or array-likes', () => {
//     /* eslint-disable no-multi-spaces */
//     expect(flatten([
//       { 0: 'a', 1: 'b', 2: 'c', length: 3 },
//       { 0: DO,  1: RE,  2: MI,  length: 3 },
//       { 0: 1,   1: 2,   2: 3,   length: 3 },
//       { 0: you, 1: me,          length: 2 }
//     ])).to.eql(['a', 'b', 'c', DO, RE, MI, 1, 2, 3, you, me])
//     /* eslint-enable no-multi-spaces */
//   })

//   it('skips an empty array', () => {
//     expect(flatten([ ['a', 'b', 'c'], [], [DO, RE, MI], [1, 2, 3], [you, me] ]))
//       .to.eql(['a', 'b', 'c', DO, RE, MI, 1, 2, 3, you, me])
//   })

//   /* eslint-disable no-sparse-arrays */
//   it.skip('skips a hole in the outer array', () => {
//     expect(flatten(['a', , 'b', , 'c'])).to.eql(['a', 'b', 'c'])
//   })

//   /* eslint-disable func-names, no-invalid-this */
//   it.skip('distinguishes undefined from a hole in an inner array', function () {
//     if (![undefined].hasOwnProperty(0)) this.skip()
//     expect(flatten([ ['a', undefined, 'b', , 'c'] ]))
//       .to.eql(['a', undefined, 'b', 'c'])
//   })
//   /* eslint-enable func-names, no-invalid-this */
//   /* eslint-enable no-sparse-arrays */

// })
