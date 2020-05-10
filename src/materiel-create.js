#!/usr/bin/env node

const shell = require('shelljs')
const exec = require('./exec')
const path = require('path')
const fs = require('fs')

async function create(dest, dirname, { template }) {
  const templatePath = path.resolve(__dirname, '../template/materiel')
  shell.mkdir(dest)
  shell.cp('-R', templatePath + '/*', dest)
  fs.writeFileSync(dest + '/.gitignore', 'node_modules/\n.env\n')
  fs.writeFileSync(dest + '/.env', 'STORE_URL=\nACCESS_TOKEN=\n')
  const packageJSONPath = dest + '/package.json'
  const packageJSON = require(packageJSONPath)
  packageJSON.name = dirname
  packageJSON.description = 'materiel'
  packageJSON.ui = template === 'element' ? 'element-ui@2' : 'view-design@4'
  fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, '  '))


  await exec('npm install --registry=https://registry.npm.taobao.org', dest)
  await exec(`npx mcco-script materiel-init --template ${template}`, dest)

  console.log(`${dirname} has been created!`)
  console.log('\nPlease run:')
  console.log(`    cd ${dirname}`)
  console.log(`    npm run dev`)
}

module.exports = create
