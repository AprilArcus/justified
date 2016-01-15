import React from 'react'
import ReactDOM from 'react-dom'
import { JustifiedParagraph } from '../../src/reactComponent'

ReactDOM.render(
  <JustifiedParagraph>
    <b>{'Line breaking'}</b>{', also known as '}<b>{'word wrapping'}</b>{', ' +
    'is the process of breaking a section of text into lines such that it ' +
    'will fit in the available width of a page, window or other display ' +
    'area. In text display, '}<b>{'line wrap'}</b>{' is the feature of ' +
    'continuing on a new line when a line is full, such that each line fits ' +
    'in the viewable window, allowing text to be read from top to bottom ' +
    'without any horizontal '}<a href="https://en.wikipedia.org/wiki/Scrolling">
    {'scrolling'}</a>{'. '}<b>{'Word wrap'}</b>{' is the additional feature ' +
    'of most '}<a href="https://en.wikipedia.org/wiki/Text_editor">{'text ' +
    'editors'}</a>{', '}<a href="https://en.wikipedia.org/wiki/Word_processors">
    {'word processors'}</a>{', and '}<a href="https://en.wikipedia.org/wiki/Web_browser">
    {'web browsers'}</a>{', of breaking lines between words rather than ' +
    'within words, when possible. Word wrap makes it unnecessary to hard-code '}
    <a href="https://en.wikipedia.org/wiki/Newline">{'newline delimiters'}</a>
    {' within '}<a href="https://en.wikipedia.org/wiki/Paragraph">{'paragraphs'}
    </a>{', and allows the display of text to adapt flexibly and dynamically ' +
    'to displays of varying sizes.'}
  </JustifiedParagraph>,
  document.body.appendChild(document.createElement('div'))
)
