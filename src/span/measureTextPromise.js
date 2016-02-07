/* @flow */
/* eslint max-nested-callbacks: 0 */

import { segmentPromise } from './segmentPromise'
import { language } from './language'
import {
  Glue,
  Box,
  Penalty,
  EOL_GLUE,
  EOL_PENALTY,
  FREE_BREAK
} from '../formattingObjects'
import { gluePlaceholder, hyphenPlaceholder } from '../utils/placeholders'
import getComputedStyle from '../utils/getComputedStyle'
import { mutate, measure } from '../utils/fastdom'

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

export function measureTextPromise(
  textNode: Text
): Promise<Glue|Box|Penalty> {
  // capture parent element in the closure of the promise in case
  // the text node is detached while the Promise fulfills
  const inline = textNode.parentNode

  return segmentPromise(
    textNode.data,
    language(textNode),
    gluePlaceholder,
    hyphenPlaceholder
  ).then(placeholders => new Promise((resolve, reject) => {

    const length = placeholders.length
    const formattingObjects = new Array(length)
    const hyphens = []
    const kerns = []
    const syllables = []

    mutate(() => {
      // (1) Build spans with text content and append them into the DOM
      //     as children to the textNode, so that they pick up the
      //     correct styles.
      const space = span(' ')
      inline.appendChild(space)

      for (let i = 0; i < length; i++) {
        const placeholder = placeholders[i]
        switch (placeholder) {
          case EOL_GLUE:
          case EOL_PENALTY:
          case FREE_BREAK:
            formattingObjects[i] = placeholders[i]
            break
          case hyphenPlaceholder: {
            const hyphen = span(placeholders[i - 1] + '-') // eslint-disable-line prefer-template
            hyphens.push(hyphen)
            inline.appendChild(hyphen)
            const kern = span(placeholders[i - 1] + placeholders[i + 1])
            kerns.push(kern)
            inline.appendChild(kern)
            break
          }
          case gluePlaceholder:
            break
          default: {
            const syllable = span(placeholders)
            syllables.push(syllable)
            inline.appendChild(syllable)
          }
        }
      }

      // (2) Measure each span and create a formatting object
      measure(() => {
        const glueWidth = getComputedStyle(space).width
        const glue = {
          type: 'glue',
          width: glueWidth,
          stretch: glueWidth * (3 / 6), // eslint-disable-line no-magic-numbers
          shrink: glueWidth * (3 / 9)   // eslint-disable-line no-magic-numbers
        }

        for (
          let i = 0, h = 0, k = 0, s = 0, queuedHyphen = false;
          i < length;
          i++
        ) {
          const placeholder = placeholders[i]
          switch (placeholder) {
            case EOL_GLUE:
            case EOL_PENALTY:
            case FREE_BREAK:
              break
            case hyphenPlaceholder:
              queuedHyphen = true
              break
            case gluePlaceholder:
              formattingObjects[i] = glue
              break
            default:
              formattingObjects[i] = new Box({
                value: placeholder,
                width: getComputedStyle(syllables[s++]).width // eslint-disable-line no-plusplus
              })
              if (queuedHyphen) {
                queuedHyphen = false
                formattingObjects[i - 1] = new Penalty({
                  value: '-',
                  width:
                    getComputedStyle(hyphens[h++]).width - // eslint-disable-line no-plusplus
                    formattingObjects[i - 2].width,
                  kern:
                    getComputedStyle(kerns[k++]).width - // eslint-disable-line no-plusplus
                    formattingObjects[i - 2].width -
                    formattingObjects[i].width,
                  penalty: 100,
                  flagged: true
                })
              }
          }
        }
        // at this point we've taken all the measurements we need,
        // so we can go ahead and
        resolve(formattingObjects)
        // (3) clean up:
        mutate(() => {
          inline.removeChild(space)
          for (let hk = 0, hkLength = hyphens.length; hk < hkLength; hk++) {
            inline.removeChild(hyphens[hk])
            inline.removeChild(kerns[hk])
          }
          for (let s = 0, sLength = syllables.length; s < sLength; s++) {
            inline.removeChild(syllables[s])
          }
        }) // end (3)
      }) // end (2)
    }) // end (1)
  }) // end new Promise()
  ) // end .then()
}
