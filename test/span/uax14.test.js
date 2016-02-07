import uax14 from '../../src/span/uax14'
import id from '../../src/utils/id'
import {
  hyphenPlaceholder,
  freeBreakPlaceholder,
  eolGluePlaceholder,
  eolPenaltyPlaceholder
} from '../../src/utils/placeholders'

describe('splitting text on UAX 14 break opportunities', () => {

  const hyphenator = sinon.spy(id)
  const breaker = uax14(hyphenator)

  describe('when there are no break opportunities', () => {

    it('should yield to the hyphenator callback', () => {
      hyphenator.reset()
      breaker('hello')
      expect(hyphenator).to.be.called()
    })

  })

  describe('when there are initial break opportunities', () => {

    it('should not yield to the hyphenator callback', () => {
      hyphenator.reset()
      breaker('-world')
      expect(hyphenator).to.be.notCalled()
    })

    it.skip('should not break after a leading hard hyphen', () => {
      expect(breaker('-world'))
        .to.eql([
          '-world'
        ])
    })

    it('should insert a penalty object after a soft hyphen', () => {
      expect(breaker('\u{00AD}world'))
        .to.eql([
          '\u{00AD}',
          hyphenPlaceholder,
          'world'
        ])
    })

    it('should force a break after a line tabulation', () => {
      expect(breaker('\vworld'))
        .to.eql([
          '\v',
          eolGluePlaceholder,
          eolPenaltyPlaceholder,
          'world'
        ])
    })

    it('should force a break after a form feed', () => {
      expect(breaker('\fworld'))
        .to.eql([
          '\f',
          eolGluePlaceholder,
          eolPenaltyPlaceholder,
          'world'
        ])
    })

    it('should force a break after a line separator', () => {
      expect(breaker('\u{2028}world'))
        .to.eql([
          '\u{2028}',
          eolGluePlaceholder,
          eolPenaltyPlaceholder,
          'world'
        ])
    })

    it('should force a break after a paragraph separator', () => {
      expect(breaker('\u{2029}world'))
        .to.eql([
          '\u{2029}',
          eolGluePlaceholder,
          eolPenaltyPlaceholder,
          'world'
        ])
    })

  })

  describe('when there are medial break opportunities', () => {

    it('should not yield to the hyphenator callback', () => {
      hyphenator.reset()
      breaker('hello-world')
      expect(hyphenator).to.be.notCalled()
    })

    it('should optionally break after a hard hyphen', () => {
      expect(breaker('hello-world'))
        .to.eql([
          'hello-',
          freeBreakPlaceholder,
          'world'
        ])
    })

    it('should insert a penalty object after a soft hyphen', () => {
      expect(breaker('hello\u{00AD}world'))
        .to.eql([
          'hello\u{00AD}',
          hyphenPlaceholder,
          'world'
        ])
    })

    it('should force a break after a line tabulation', () => {
      expect(breaker('hello\vworld'))
        .to.eql([
          'hello\v',
          eolGluePlaceholder,
          eolPenaltyPlaceholder,
          'world'
        ])
    })

    it('should force a break after a form feed', () => {
      expect(breaker('hello\fworld'))
        .to.eql([
          'hello\f',
          eolGluePlaceholder,
          eolPenaltyPlaceholder,
          'world'
        ])
    })

    it('should force a break after a line separator', () => {
      expect(breaker('hello\u{2028}world'))
        .to.eql([
          'hello\u{2028}',
          eolGluePlaceholder,
          eolPenaltyPlaceholder,
          'world'
        ])
    })

    it('should force a break after a paragraph separator', () => {
      expect(breaker('hello\u{2029}world'))
        .to.eql([
          'hello\u{2029}',
          eolGluePlaceholder,
          eolPenaltyPlaceholder,
          'world'
        ])
    })

  })

  describe('when there are terminal break opportunities', () => {

    it('should not yield to the hyphenator callback', () => {
      hyphenator.reset()
      breaker('hello-world-')
      expect(hyphenator).to.be.notCalled()
    })

    it('should not break after a trailing hard hyphen', () => {
      expect(breaker('hello-world-'))
        .to.eql([
          'hello-',
          freeBreakPlaceholder,
          'world-'
        ])
    })

    it('should not insert a penalty object after a trailing soft hyphen', () => { // eslint-disable-line max-len
      expect(breaker('hello-world\u{00AD}'))
        .to.eql([
          'hello-',
          freeBreakPlaceholder,
          'world\u{00AD}'
        ])
    })

    it.skip('should force a break after a line tabulation', () => {
      expect(breaker('hello-world\v'))
        .to.eql([
          'hello-',
          freeBreakPlaceholder,
          'world\v',
          eolGluePlaceholder,
          eolPenaltyPlaceholder
        ])
    })

    it.skip('should force a break after a trailing form feed', () => {
      expect(breaker('world\f'))
        .to.eql([
          'world\f',
          eolGluePlaceholder,
          eolPenaltyPlaceholder
        ])
    })

    it.skip('should force a break after a trailing line separator', () => {
      expect(breaker('world\u{2028}'))
        .to.eql([
          'world\u{2028}',
          eolGluePlaceholder,
          eolPenaltyPlaceholder
        ])
    })

    it.skip('should force a break after a trailing paragraph separator', () => {
      expect(breaker('world\u{2029}'))
        .to.eql([
          'world\u{2029}',
          eolGluePlaceholder,
          eolPenaltyPlaceholder
        ])
    })

  })

})
