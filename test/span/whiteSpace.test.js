import { whiteSpace } from '../../src/span/whiteSpace'
import { gluePlaceholder } from '../../src/utils/placeholders'

describe('splitting text on white space', () => {

  const id = v => [v]

  it('should split a string on spaces,', () => {
    expect(whiteSpace('hello world', id))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('newlines,', () => {
    expect(whiteSpace('hello\nworld', id))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('carriage returns,', () => {
    expect(whiteSpace('hello\rworld', id))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('linefeeds,', () => {
    expect(whiteSpace('hello\fworld', id))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('and tabs.', () => {
    expect(whiteSpace('hello\tworld', id))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('should consolidate multiple spaces...', () => {
    expect(whiteSpace('hello  world', id))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('...of mixed kinds.', () => {
    expect(whiteSpace('hello \n\tworld', id))
      .to.eql(['hello', gluePlaceholder, 'world'])
  })

  it('should detect leading white space', () => {
    expect(whiteSpace(' hello world', id))
      .to.eql([gluePlaceholder, 'hello', gluePlaceholder, 'world'])
  })

  it('should detect trailing white space', () => {
    expect(whiteSpace('hello world ', id))
      .to.eql(['hello', gluePlaceholder, 'world', gluePlaceholder])
  })

  it('should ignore a non-breaking space', () => {
    expect(whiteSpace('hello\u{00A0}world', id))
      .to.eql(['hello\u{00A0}world'])
  })

  it('should ignore a line separator', () => {
    expect(whiteSpace('hello\u{2028}world', id))
      .to.eql(['hello\u{2028}world'])
  })

  it('should ignore a paragraph separator', () => {
    expect(whiteSpace('hello\u{2029}world', id))
      .to.eql(['hello\u{2029}world'])
  })

  it('should use a supplied callback to further process text strings,', () => {
    expect(whiteSpace('hello world', string => [string, 'processed']))
      .to.eql(['hello', 'processed', gluePlaceholder, 'world', 'processed'])
  })

})
