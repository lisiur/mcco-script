const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const FormData = require('form-data')
const axios = require('axios').default
const paths = require('./paths')
const materielDocBuild = require('./materiel-doc-build')
const materielBuild = require('./materiel-build')
const alert = require('./alert')
require('dotenv').config({ path: paths.userDotEnvPath })
const { STORE_URL, ACCESS_TOKEN } = process.env

async function publish() {
  const packageJSON = require(paths.userPackageJsonPath)
  const { name, version, keywords = [], ui = '' } = packageJSON
  if (!name) {
    alert.error('package.json 中 name 不能为空')
    return
  }
  if (!version) {
    alert.error('package.json 中 version 不能为空')
  }
  const testMaterielVersionUrl = `${STORE_URL}/materiel/test`
  try {
    const { data: { success, errMsg } } = await axios.get(testMaterielVersionUrl, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      },
      params: {
        name,
        version,
      },
    })
    if (!success) {
      throw new Error(errMsg)
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      alert.error('认证失败')
    } else {
      alert.error(err.message)
    }
    return
  }
  await Promise.all([
    materielBuild(),
    materielDocBuild(),
  ])
  const zipPath = path.resolve(paths.tmpPath, `${name}@${version}.zip`)
  await zipFiles(zipPath)
  try {
    const uploadUrl = `${STORE_URL}/materiel/upload`
    const formData = new FormData()
    formData.append('file', fs.createReadStream(zipPath))
    formData.append('tags', keywords.join(','))
    formData.append('ui', ui)
    const { data: { success, errMsg } } = await axios.post(uploadUrl, formData, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        ...formData.getHeaders(),
      },
    })
    if (success) {
      alert.success('发布成功')
    } else {
      throw new Error(errMsg)
    }
  } catch (err) {
    alert.error(err.message)
  }
}

async function zipFiles(zipPath) {
  if (fs.existsSync(zipPath)) {
    fs.unlink(zipPath, () => { })
  }
  const target = fs.createWriteStream(zipPath)
  const zip = archiver('zip', {
    zlib: { level: 9 }
  })
  return new Promise(resolve => {
    target.on('close', resolve)
    if (fs.existsSync(paths.userPreviewPng)) {
      zip.file(paths.userPreviewPng, { name: 'preview.png' })
    } else {
      // TODO: 生成自定义图片
    }
    zip.directory(paths.distPath + '/', 'dist')
    zip.directory(paths.docDistPath + '/', 'doc')
    zip.directory(paths.sourcePath + '/', 'source')
    zip.pipe(target)
    zip.finalize()
  })
}

module.exports = publish
