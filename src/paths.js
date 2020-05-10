const { resolve: pathResolve } = require('path')

const userPath = process.cwd()
const packagePath = userPath + '/node_modules/mcco-script'

const userDocReadmePath = pathResolve(userPath, 'docs/README.md')
const userDocDemosPath = pathResolve(userPath, 'docs/demo')
const userComponentsPath = pathResolve(userPath, 'docs/components')
const userAppPath = pathResolve(userPath, 'app')
const userPackageJsonPath = pathResolve(userPath, 'package.json')
const userDotEnvPath = pathResolve(userPath, '.env')
const userPreviewPng = pathResolve(userPath, 'preview.png')

const framePath = pathResolve(packagePath, 'frame/materiel')
const tmpPath = pathResolve(packagePath, '.tmp')

const destDocReadmePath = pathResolve(packagePath, '.tmp/docs/README.md')
const destDocDemosPath = pathResolve(packagePath, '.tmp/docs/demo')
const destComponentsPath = pathResolve(packagePath, '.tmp/docs/.vuepress/components')
/** 供 vuepress markdown 引用文件代码时，缩短路径 */
const destComponentsAliasPath = pathResolve(packagePath, '.tmp/components')
const destAppPath = pathResolve(packagePath, '.tmp/app')

const templatePath = pathResolve(packagePath, 'template/materiel')

const sourcePath = pathResolve(tmpPath, 'app')
const distPath = pathResolve(tmpPath, 'dist')
const docDistPath = pathResolve(tmpPath, 'docs/.vuepress/dist')

const configPath = pathResolve(userPath, 'mcco.config.js')

module.exports = {
  userDocReadmePath,
  userDocDemosPath,
  userPath,
  userAppPath,
  userPreviewPng,
  userComponentsPath,
  userPackageJsonPath,
  userDotEnvPath,
  framePath,
  tmpPath,
  destDocReadmePath,
  destDocDemosPath,
  destComponentsPath,
  destComponentsAliasPath,
  destAppPath,
  templatePath,
  sourcePath,
  distPath,
  docDistPath,
  configPath,
}