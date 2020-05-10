#!/usr/bin/env node

const shell = require('shelljs')
const paths = require('./paths')
const exec = require('./exec')

async function init(options = {}) {
  let { template } = options
  if (!template) {
    const { ui } = require(paths.userPackageJsonPath)
    if (!ui) {
      template = 'default'
    } else if (ui.startsWith('element')) {
      template = 'element'
    } else if (ui.startsWith('view-design')) {
      template = 'iview'
    } else {
      template = 'default'
    }
  }
  clean()
  shell.mkdir('-p', paths.tmpPath)
  shell.cp('-R', `${paths.framePath}/${template}/*`, paths.tmpPath)
  shell.ln('-sf', paths.userAppPath, paths.destAppPath)
  shell.ln('-sf', paths.userDocDemosPath, paths.destDocDemosPath)
  shell.ln('-sf', paths.userDocReadmePath, paths.destDocReadmePath)
  shell.ln('-sf', paths.userComponentsPath, paths.destComponentsPath)
  shell.ln('-sf', paths.userComponentsPath, paths.destComponentsAliasPath)
  await installDep()
}

function clean() {
  shell.rm('-rf', paths.destDocDemosPath)
  shell.rm('-rf', paths.destDocReadmePath)
  shell.rm('-rf', paths.destComponentsPath)
  shell.rm('-rf', paths.destAppPath)
}

async function installDep() {
  return exec('npm install --registry=https://registry.npm.taobao.org', paths.tmpPath)
}


module.exports = init