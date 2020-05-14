const {spawn} = require('child_process')
const isWin = /^win/.test(process.platform)

module.exports = function(cmd, cwd) {
  let [cmdHead, ...cmdArgs] = cmd.split(' ')
  if (cmdHead === 'npm' && isWin) {
    cmdHead = 'npm.cmd'
  }
  const cp = spawn(cmdHead, cmdArgs, {
    cwd,
    stdio: 'inherit',
  })
  return new Promise((resolve, reject) => {
    cp.on('error', reject)
    cp.on('close', resolve)
  })
}