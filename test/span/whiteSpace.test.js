import { whiteSpace } from '../../src/span/whiteSpace'

describe('splitting text on white space', () => {

  const glue = {}
  const id = (v) => [v]

  it('should split a string on spaces,', () => {
    expect(whiteSpace('hello world', glue, id))
      .to.eql(['hello', glue, 'world'])
  })

  it('newlines,', () => {
    expect(whiteSpace('hello\nworld', glue, id))
      .to.eql(['hello', glue, 'world'])
  })

  it('carriage returns,', () => {
    expect(whiteSpace('hello\rworld', glue, id))
      .to.eql(['hello', glue, 'world'])
  })

  it('linefeeds,', () => {
    expect(whiteSpace('hello\fworld', glue, id))
      .to.eql(['hello', glue, 'world'])
  })

  it('and tabs.', () => {
    expect(whiteSpace('hello\tworld', glue, id))
      .to.eql(['hello', glue, 'world'])
  })

  it('should consolidate multiple spaces...', () => {
    expect(whiteSpace('hello  world', glue, id))
      .to.eql(['hello', glue, 'world'])
  })

  it('...of mixed kinds.', () => {
    expect(whiteSpace('hello \n\tworld', glue, id))
      .to.eql(['hello', glue, 'world'])
  })

  it('should detect leading white space', () => {
    expect(whiteSpace(' hello world', glue, id))
      .to.eql([glue, 'hello', glue, 'world'])
  })

  it('should detect trailing white space', () => {
    expect(whiteSpace('hello world ', glue, id))
      .to.eql(['hello', glue, 'world', glue])
  })

  it('should ignore a non-breaking space', () => {
    expect(whiteSpace('hello\u{00A0}world', glue, id))
      .to.eql(['hello\u{00A0}world'])
  })

  it('should ignore a line separator', () => {
    expect(whiteSpace('hello\u{2028}world', glue, id))
      .to.eql(['hello\u{2028}world'])
  })

  it('should ignore a paragraph separator', () => {
    expect(whiteSpace('hello\u{2029}world', glue, id))
      .to.eql(['hello\u{2029}world'])
  })

  it('should use a supplied callback to further process text strings,', () => {
    expect(whiteSpace('hello world', glue, string => [string, 'processed']))
      .to.eql(['hello', 'processed', glue, 'world', 'processed'])
  })

})
