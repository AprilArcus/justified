var os = require('os')
  , version
  , major
  , minor
  , devServerInstance = require('./devServer')
  , runAll = require('npm-run-all')
  , tasks = ['test:polyfill'/* , 'test:native' */]

if (process.platform === 'linux' || process.platform === 'darwin') {
  // tasks.unshift('flow:check')
}

/* eslint-disable no-magic-numbers */
if (process.platform === 'win32') {
  version = os.release().split('.')
  major = parseInt(version[0], 10)
  minor = parseInt(version[1], 10)
  if (major < 6 || (major === 6 && minor === 0)) tasks.push('test:legacy')
}
/* eslint-enable no-magic-numbers */

runAll(tasks, {
  parallel: true,
  stdin: null,
  stdout: process.stdout,
  stderr: process.stderr
}).then(function () {
  console.log('all tests passed!')
  devServerInstance.close()
  process.exit(0)
}).catch(function (err) {
  console.log(err)
  devServerInstance.close()
  process.exit(1)
})
