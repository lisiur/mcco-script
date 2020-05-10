#!/usr/bin/env node

const paths = require('./paths')
const exec = require('./exec')

async function docsBuild() {
  await exec('npm run docs:build', paths.tmpPath)
}

module.exports = docsBuild
