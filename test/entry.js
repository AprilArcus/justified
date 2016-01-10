/* eslint-env commonjs */

const testsContext = require.context('.', false, /^((?!entry).)*$/);
testsContext.keys().forEach(testsContext);
