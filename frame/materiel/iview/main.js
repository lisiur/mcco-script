import Vue from 'vue'
import App from './app/App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import config from '../../../mcco.config.json'

const { scripts = [], links = [] } = config

links.forEach(href => {
  loadCss(href)
})

loadSyncScripts(scripts).then(() => {
  Vue.use(ViewUI)
  new Vue({
    render: h => h(App),
  }).$mount('#app')
})

function loadSyncScripts(srcList) {
  return Promise.all(srcList.map(src => fetch(src).then(res => res.text())))
  .then(scripts => {
    scripts.forEach(script => {
      new Function(script)()
    })
  })
}

function loadScript(src) {
  return new Promise(resolve => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    document.head.appendChild(script)
  })
}

function loadCss(href) {
  const link = document.createElement('link')
  link.href = href
  document.head.appendChild(link)
}