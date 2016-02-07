import whiteSpace from '../../src/span/whiteSpace'
import { gluePlaceholder } from '../../src/utils/placeholders'
import pureArray from '../../src/utils/pureArray'

describe('splitting text on white space', () => {

  it('should split a string on spaces,', () => {
    expect(whiteSpace('hello world', pureArray))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('newlines,', () => {
    expect(whiteSpace('hello\nworld', pureArray))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('carriage returns,', () => {
    expect(whiteSpace('hello\rworld', pureArray))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('linefeeds,', () => {
    expect(whiteSpace('hello\fworld', pureArray))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('and tabs.', () => {
    expect(whiteSpace('hello\tworld', pureArray))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('should consolpureArrayate multiple spaces...', () => {
    expect(whiteSpace('hello  world', pureArray))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('...of mixed kinds.', () => {
    expect(whiteSpace('hello \n\tworld', pureArray))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('should detect leading white space', () => {
    expect(whiteSpace(' hello world', pureArray))
      .to.eql([gluePlaceholder, 'hello', gluePlaceholder, 'world'])
  })

  it('should detect trailing white space', () => {
    expect(whiteSpace('hello world ', pureArray))
      .to.eql(['hello', gluePlaceholder, 'world', gluePlaceholder])
  })

  it('should ignore a non-breaking space', () => {
    expect(whiteSpace('hello\u{00A0}world', pureArray))
      .to.eql(['hello\u{00A0}world'])
  })

  it('should ignore a line separator', () => {
    expect(whiteSpace('hello\u{2028}world', pureArray))
      .to.eql(['hello\u{2028}world'])
  })

  it('should ignore a paragraph separator', () => {
    expect(whiteSpace('hello\u{2029}world', pureArray))
      .to.eql(['hello\u{2029}world'])
  })

  it('should use a supplied callback to further process text strings,', () => {
    expect(whiteSpace('hello world', string => [string, 'processed']))
      .to.eql(['hello', 'processed', gluePlaceholder, 'world', 'processed'])
  })

})
