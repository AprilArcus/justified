// import { uax14 } from '../../src/iterators/uax14'
// import {
//   Penalty,
//   EOL_GLUE,
//   EOL_PENALTY,
//   FREE_BREAK
// } from '../../src/formattingObjects'

// describe('splitting text on UAX 14 break opportunities', () => {

//   const hyphenator = sinon.spy()
//   const hyphen = new Penalty({
//     width: 0,
//     penalty: 0,
//     flagged: false,
//     value: '-',
//     kern: 0
//   })

//   // describe('when there are no break opportunities', () => {

//   //   before(() => {
//   //     hyphenator.reset()
//   //     Array.from(uax14('hello', hyphenator, hyphen))
//   //   })

//   //   it.skip('should yield to the hyphenator callback', () => {
//   //     expect(hyphenator).to.be.called()
//   //   })

//   // })

//   describe('when there are initial break opportunities', () => {

//     before(() => {
//       hyphenator.reset()
//       Array.from(uax14('-world', hyphenator, hyphen))
//     })

//     it('should not yield to the hyphenator callback', () => {
//       expect(hyphenator).to.be.notCalled()
//     })

//     it.skip('should not break after a leading hard hyphen', () => {
//       expect(Array.from(uax14('-world', hyphenator, hyphen)))
//         .to.eql(['-world'])
//     })

//     it('should insert a penalty object after a soft hyphen', () => {
//       expect(Array.from(uax14('\u{00AD}world', hyphenator, hyphen)))
//         .to.eql(['\u{00AD}', hyphen, 'world'])
//     })

//     it('should force a break after a line tabulation', () => {
//       expect(Array.from(uax14('\vworld', hyphenator, hyphen)))
//         .to.eql(['\v', EOL_GLUE, EOL_PENALTY, 'world'])
//     })

//     it('should force a break after a form feed', () => {
//       expect(Array.from(uax14('\fworld', hyphenator, hyphen)))
//         .to.eql(['\f', EOL_GLUE, EOL_PENALTY, 'world'])
//     })

//     it('should force a break after a line separator', () => {
//       expect(Array.from(uax14('\u{2028}world', hyphenator, hyphen)))
//         .to.eql(['\u{2028}', EOL_GLUE, EOL_PENALTY, 'world'])
//     })

//     it('should force a break after a paragraph separator', () => {
//       expect(Array.from(uax14('\u{2029}world', hyphenator, hyphen)))
//         .to.eql(['\u{2029}', EOL_GLUE, EOL_PENALTY, 'world'])
//     })

//   })

//   describe('when there are medial break opportunities', () => {

//     before(() => {
//       hyphenator.reset()
//       Array.from(uax14('hello-world', hyphenator, hyphen))
//     })

//     it('should not yield to the hyphenator callback', () => {
//       expect(hyphenator).to.be.notCalled()
//     })

//     it('should optionally break after a hard hyphen', () => {
//       expect(Array.from(uax14('hello-world', hyphenator, hyphen)))
//         .to.eql(['hello-', FREE_BREAK, 'world'])
//     })

//     it('should insert a penalty object after a soft hyphen', () => {
//       expect(Array.from(uax14('hello\u{00AD}world', hyphenator, hyphen)))
//         .to.eql(['hello\u{00AD}', hyphen, 'world'])
//     })

//     it('should force a break after a line tabulation', () => {
//       expect(Array.from(uax14('hello\vworld', hyphenator, hyphen)))
//         .to.eql(['hello\v', EOL_GLUE, EOL_PENALTY, 'world'])
//     })

//     it('should force a break after a form feed', () => {
//       expect(Array.from(uax14('hello\fworld', hyphenator, hyphen)))
//         .to.eql(['hello\f', EOL_GLUE, EOL_PENALTY, 'world'])
//     })

//     it('should force a break after a line separator', () => {
//       expect(Array.from(uax14('hello\u{2028}world', hyphenator, hyphen)))
//         .to.eql(['hello\u{2028}', EOL_GLUE, EOL_PENALTY, 'world'])
//     })

//     it('should force a break after a paragraph separator', () => {
//       expect(Array.from(uax14('hello\u{2029}world', hyphenator, hyphen)))
//         .to.eql(['hello\u{2029}', EOL_GLUE, EOL_PENALTY, 'world'])
//     })

//   })

//   describe('when there are terminal break opportunities', () => {

//     before(() => {
//       hyphenator.reset()
//       Array.from(uax14('hello-world-', hyphenator, hyphen))
//     })

//     it('should not yield to the hyphenator callback', () => {
//       expect(hyphenator).to.be.notCalled()
//     })

//     it('should not break after a trailing hard hyphen', () => {
//       expect(Array.from(uax14('hello-world-', hyphenator, hyphen)))
//         .to.eql(['hello-', FREE_BREAK, 'world-'])
//     })

//     it('should not insert a penalty object after a trailing soft hyphen', () => { // eslint-disable-line max-len
//       expect(Array.from(uax14('hello-world\u{00AD}', hyphenator, hyphen)))
//         .to.eql(['hello-', FREE_BREAK, 'world\u{00AD}'])
//     })

//     it.skip('should force a break after a line tabulation', () => {
//       expect(Array.from(uax14('hello-world\v', hyphenator, hyphen)))
//         .to.eql(['hello-', FREE_BREAK, 'world\v', EOL_GLUE, EOL_PENALTY])
//     })

//     it.skip('should force a break after a trailing form feed', () => {
//       expect(Array.from(uax14('world\f', hyphenator, hyphen)))
//         .to.eql(['world\f', EOL_GLUE, EOL_PENALTY])
//     })

//     it.skip('should force a break after a trailing line separator', () => {
//       expect(Array.from(uax14('world\u{2028}', hyphenator, hyphen)))
//         .to.eql(['world\u{2028}', EOL_GLUE, EOL_PENALTY])
//     })

//     it.skip('should force a break after a trailing paragraph separator', () => {
//       expect(Array.from(uax14('world\u{2029}', hyphenator, hyphen)))
//         .to.eql(['world\u{2029}', EOL_GLUE, EOL_PENALTY])
//     })

//   })

// })
