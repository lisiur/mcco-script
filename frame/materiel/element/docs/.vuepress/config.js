const path = require('path')
const glob = require('glob')
const markdownFiles = glob.sync(path.resolve(__dirname, '../demo/demo*.md')).map(f => {
  const chunks = f.split('/')
  const file = chunks[chunks.length - 1]
  const filename = file.split('.')[0]
  return '/demo/' + filename
});
const packageJSON = require(path.resolve(__dirname, '../../../../../package.json'))
const config = Object.assign({
  scripts: [],
  links: [],
}, require('../../../../../mcco.config.json'))
let base = '/'
if (process.env.NODE_ENV === 'production') {
  base = `/mcco-materiel-doc/${packageJSON.name}@${packageJSON.version}/doc/`
}
module.exports = {
  base,
  title: `${packageJSON.name}@${packageJSON.version}`,
  description: packageJSON.description,
  themeConfig: {
    navbar: false,
    sidebar: ['/', ...markdownFiles]
  },
  head: [
    ...config.links.map(href => [
      'link', { href, rel: 'stylesheet', type: 'text/css' }
    ]),
    ...config.scripts.map(src => [
      'script', { src }
    ]),
  ],
}