/* eslint-env browser, commonjs */
/* eslint node/no-unsupported-features: 0 */

const testsContext = require.context('..', true, /\.test\.js$/)
testsContext.keys().forEach(testsContext)
