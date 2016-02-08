import whiteSpace from '../../src/span/whiteSpace'
import { gluePlaceholder } from '../../src/utils/placeholders'
import pureArray from '../../src/utils/pureArray'

describe('splitting text on white space', () => {

  it('should split a string on spaces,', () => {
    expect(whiteSpace(pureArray)('hello world'))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('newlines,', () => {
    expect(whiteSpace(pureArray)('hello\nworld'))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('carriage returns,', () => {
    expect(whiteSpace(pureArray)('hello\rworld'))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('linefeeds,', () => {
    expect(whiteSpace(pureArray)('hello\fworld'))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('and tabs.', () => {
    expect(whiteSpace(pureArray)('hello\tworld'))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('should consolpureArrayate multiple spaces...', () => {
    expect(whiteSpace(pureArray)('hello  world'))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('...of mixed kinds.', () => {
    expect(whiteSpace(pureArray)('hello \n\tworld'))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('should detect leading white space', () => {
    expect(whiteSpace(pureArray)(' hello world'))
      .to.eql([gluePlaceholder, 'hello', gluePlaceholder, 'world'])
  })

  it('should detect trailing white space', () => {
    expect(whiteSpace(pureArray)('hello world '))
      .to.eql(['hello', gluePlaceholder, 'world', gluePlaceholder])
  })

  it('should ignore a non-breaking space', () => {
    expect(whiteSpace(pureArray)('hello\u{00A0}world'))
      .to.eql(['hello\u{00A0}world'])
  })

  it('should ignore a line separator', () => {
    expect(whiteSpace(pureArray)('hello\u{2028}world'))
      .to.eql(['hello\u{2028}world'])
  })

  it('should ignore a paragraph separator', () => {
    expect(whiteSpace(pureArray)('hello\u{2029}world'))
      .to.eql(['hello\u{2029}world'])
  })

  it('should use a supplied callback to further process text strings,', () => {
    expect(whiteSpace(string => [string, 'processed'])('hello world'))
      .to.eql(['hello', 'processed', gluePlaceholder, 'world', 'processed'])
  })

})
