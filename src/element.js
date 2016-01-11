/* @flow */

import { injectCallbacks } from './injectCallbacks'
import {
  createdCallback,
  attachedCallback,
  detachedCallback,
  attributeChangedCallback
} from './elementCallbacks'

injectCallbacks({
  createdCallback,
  attachedCallback,
  detachedCallback,
  attributeChangedCallback
})
