#!/usr/bin/env node

const fs = require('fs')
const exec = require('./exec')
const paths = require('./paths')
const materielInit = require('./materiel-init')

async function dev() {
  if (!fs.existsSync(paths.tmpPath)) {
    await materielInit()
  }
  await exec('npm run dev', paths.tmpPath)
}

module.exports = dev
