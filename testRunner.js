var runAll = require('npm-run-all')
  , tasks = ['test:generic', 'test:chrome'];

if (process.platform === 'win32') {
  tasks = tasks.concat(['test:ie8', 'test:ie9']);
}

runAll(tasks, {
  parallel: false,
  stdin: null,
  stdout: process.stdout,
  stderr: process.stderr
}).then(function () {
  process.exit(0);
}).catch(function () {
  process.exit(1);
});
