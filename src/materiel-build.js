#!/usr/bin/env node

const exec = require('./exec')
const paths = require('./paths')
const materielInit = require('./materiel-init')
const fs = require('fs')

async function build() {
  if (!fs.existsSync(paths.tmpPath)) {
    await materielInit()
  }
  await exec('npm run build', paths.tmpPath)
}

module.exports = build
