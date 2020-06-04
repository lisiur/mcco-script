#!/usr/bin/env node

const { program } = require('commander')
const materielCreate = require('./materiel-create')
const materielInit = require('./materiel-init')
const materielDev = require('./materiel-dev')
const materielDocDev = require('./materiel-doc-dev')
const materielPublish = require('./materiel-publish')

program.version('0.1.0')

program
  .command('materiel-create <dirname>')
  .option('-t, --template <type>', 'element | iview', 'default')
  .action((dirname, { template }) => {
    if (!['element', 'iview', 'default'].includes(template)) {
      console.error('valid template: element | iview')
      return
    }
    const dest = process.cwd() + `/${dirname}`
    materielCreate(dest, dirname, { template })
  })

program
  .command('create <dirname>')
  .option('-t, --template <type>', 'element | iview', 'default')
  .action((dirname, { template }) => {
    if (!['element', 'iview', 'default'].includes(template)) {
      console.error('valid template: element | iview')
      return
    }
    const dest = process.cwd() + `/${dirname}`
    materielCreate(dest, dirname, { template })
  })

program
  .command('materiel-init')
  .option('-t, --template <type>', 'element | iview', 'default')
  .action(({ template }) => {
    materielInit({ template })
  })

program
  .command('materiel-dev')
  .action(() => {
    materielDev()
  })

program
  .command('materiel-doc')
  .action(() => {
    materielDocDev()
  })

program
  .command('materiel-publish')
  .action(() => {
    materielPublish()
  })

program.parse(process.argv)