import { segmentPromise } from './segmentPromise'
import { language } from './language'
import { Glue, Box, Penalty } from '../formattingObjects'

const gluePlaceholder = 0
const hyphenPlaceholder = 1

function span(string: string): HTMLSpanElement {
  const el = document.createElement('span')
  el.style.position = 'absolute'
  el.style.wordBreak = 'keep-all'
  el.style.hyphens = 'none'
  el.style.WebkitHyphens = 'none'
  el.style.MozHyphens = 'none'
  el.style.msHyphens = 'none'
  el.appendChild(document.createTextNode(string))
  return el
}

export function measureText(textNode: Text): Promise<Glue|Box|Penalty> {
  // capture parent element in the closure of the promise in case
  // the text node is detached while the Promise fulfills
  const inline = textNode.parentNode

  return segmentPromise(
    textNode.data,
    language(textNode),
    gluePlaceholder,
    hyphenPlaceholder
  ).then(formattingObjects => new Promise((resolve, reject) => {

    const space = span(' ')
    const hyphens = []
    const syllables = []

    for (let i = 0, len = formattingObjects.length; i < len; i++) {
      const obj = formattingObjects[i]
      if (obj === hyphenPlaceholder) {
        hyphens.push(span(`${formattingObjects[i - 1]}-`))
      } else if (typeof obj === 'string') {
        syllables.push(span(obj))
      }
    }

    fastdom.mutate(() => {
      inline.appendChild(space)
      for (let h = 0, len = hyphens.length; h < len; h++) {
        inline.appendChild(hyphens[h])
      }
      for (let s = 0, len = syllables.length; s < len; s++) {
        inline.appendChild(syllables[s])
      }
    })

    fastdom.measure(() => {
      const glueWidth = getComputedStyle(space).width
      const glue = {
        type: 'glue',
        width: glueWidth,
        stretch: glueWidth * (3 / 6), // eslint-disable-line no-magic-numbers
        shrink: glueWidth * (3 / 9)   // eslint-disable-line no-magic-numbers
      }

      for (let i = 0, s = 0, len = formattingObjects.length; i < len; i++) {
        const obj = formattingObjects[i]
        if (obj === gluePlaceholder) {
          formattingObjects[i] = glue // eslint-disable-line no-param-reassign
        } else if (typeof obj === 'string') {
          formattingObjects[i] = {    // eslint-disable-line no-param-reassign
            type: 'box',
            width: getComputedStyle(syllables[s++]).width, // eslint-disable-line no-plusplus
            value: obj
          }
        }
      }

      for (let i = 0, h = 0, len = formattingObjects.length; i < len; i++) {
        const obj = formattingObjects[i]
        if (obj === hyphenPlaceholder) {
          formattingObjects[i] = { // eslint-disable-line no-param-reassign
            type: 'penalty',
            kern:
              -(formattingObjects[i - 1].width +
                formattingObjects[i + 1].width),
            width:
              getComputedStyle(hyphens[h++]).width - // eslint-disable-line no-plusplus
              formattingObjects[i - 1].width,
            penalty: 100,
            flagged: true,
            value: '-'
          }
        }
      }
    })

    fastdom.mutate(() => {
      for (let h = 0, len = hyphens.length; h < len; h++) {
        const hyphen = hyphens[h].innerHTML.childNodes[0]
        hyphen.data =
          hyphen.previousSibling.textContent + hyphen.nextSibling.textContent
      }
    })

    // fastdom.mutate(() => {
    //   inline.removeChild(space)
    //   for (let i = 0, len = hyphens.length; i < len; i++) {
    //     inline.removeChild(hyphens[i])
    //   }
    //   for (let i = 0, len = syllables.length; i < len; i++) {
    //     inline.removeChild(syllables[i])
    //   }
    // })

  }))

}

