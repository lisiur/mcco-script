#!/usr/bin/env node

const fs = require('fs')
const exec = require('./exec')
const paths = require('./paths')
const materielInit = require('./materiel-init')

async function docsDev() {
  if (!fs.existsSync(paths.tmpPath)) {
    await materielInit()
  }
  await exec('npm run docs:dev', paths.tmpPath)
}

module.exports = docsDev
