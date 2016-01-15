/* eslint-env browser, commonjs */
/* eslint node/no-unsupported-features: 0 */

import { injectCallbacks } from '../../src/injectCallbacks'
import * as callbacks from '../../src/elementCallbacks'

// set up spies
Object.keys(callbacks).forEach(key => {
  callbacks[key] = sinon.spy(callbacks[key])
})
injectCallbacks(callbacks)

const testsContext = require.context('..', false)
testsContext.keys().forEach(testsContext)
