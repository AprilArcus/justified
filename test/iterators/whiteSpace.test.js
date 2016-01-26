import { whiteSpace } from '../../src/iterators/whiteSpace'
import { Glue } from '../../src/formattingObjects'

describe('splitting text on white space', () => {

  let glue

  before(() => {
    glue = new Glue({
      width: 0,
      stretch: 0,
      shrink: 0
    })
  })

  it('should split a string on spaces,', () => {
    expect(Array.from(whiteSpace('hello world', glue)))
      .to.eql(['hello', glue, 'world'])
  })

  it('newlines,', () => {
    expect(Array.from(whiteSpace('hello\nworld', glue)))
      .to.eql(['hello', glue, 'world'])
  })

  it('carriage returns,', () => {
    expect(Array.from(whiteSpace('hello\rworld', glue)))
      .to.eql(['hello', glue, 'world'])
  })

  it('linefeeds,', () => {
    expect(Array.from(whiteSpace('hello\fworld', glue)))
      .to.eql(['hello', glue, 'world'])
  })

  it('and tabs.', () => {
    expect(Array.from(whiteSpace('hello\tworld', glue)))
      .to.eql(['hello', glue, 'world'])
  })

  it('should consolidate multiple spaces...', () => {
    expect(Array.from(whiteSpace('hello  world', glue)))
      .to.eql(['hello', glue, 'world'])
  })

  it('...of mixed kinds.', () => {
    expect(Array.from(whiteSpace('hello \n\tworld', glue)))
      .to.eql(['hello', glue, 'world'])
  })

  it('should detect leading white space', () => {
    expect(Array.from(whiteSpace(' hello world', glue)))
      .to.eql([glue, 'hello', glue, 'world'])
  })

  it('should detect trailing white space', () => {
    expect(Array.from(whiteSpace('hello world ', glue)))
      .to.eql(['hello', glue, 'world', glue])
  })

  it('should ignore a non-breaking space', () => {
    expect(Array.from(whiteSpace('hello\u{00A0}world', glue)))
      .to.eql(['hello\u{00A0}world'])
  })

  it('should ignore a line separator', () => {
    expect(Array.from(whiteSpace('hello\u{2028}world')))
      .to.eql(['hello\u{2028}world'])
  })

  it('should ignore a paragraph separator', () => {
    expect(Array.from(whiteSpace('hello\u{2029}world')))
      .to.eql(['hello\u{2029}world'])
  })

})
