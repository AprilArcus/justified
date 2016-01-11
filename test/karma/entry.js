/* eslint-env commonjs */
/* eslint node/no-unsupported-features: 0 */

const testsContext = require.context('..', false)
testsContext.keys().forEach(testsContext)
