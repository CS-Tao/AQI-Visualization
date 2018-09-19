import Vue from 'vue'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import store from './store'
import './assets/svg'
// import './api/mock'
import './style/index.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(Element, {size: 'small'})
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.openLink = (url) => {
  try {
    console.log(process.env.BUILD_TARGET)
    // if (process.env.BUILD_TARGET !== 'web') { require('electron').shell.openExternal(url) }
  } catch (e) {
    window.open(url)
  }
}
Vue.prototype.$openLink = Vue.openLink

Vue.triggerResize = () => {
  let e = document.createEvent('Event')
  e.initEvent('resize', true, true)
  window.dispatchEvent(e)
}
Vue.prototype.$triggerResize = Vue.triggerResize

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
