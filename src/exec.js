const {spawn} = require('child_process')

module.exports = function(cmd, cwd) {
  const [cmdHead, ...cmdArgs] = cmd.split(' ')
  const cp = spawn(cmdHead, cmdArgs, {
    cwd,
    stdio: 'inherit',
  })
  return new Promise((resolve, reject) => {
    cp.on('error', reject)
    cp.on('close', resolve)
  })
}