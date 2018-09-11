import Vue from 'vue'
import axios from 'axios'
import Element from 'element-ui'

import App from './App'
import router from './router'
import store from './store'
import './api/mock'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(Element, {size: 'small'})
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.openLink = (url) => {
  try {
    if (process.env.BUILD_TARGET !== 'web') { require('electron').shell.openExternal(url) }
  } catch (e) {
    window.open(url)
  }
}
Vue.prototype.$openLink = Vue.openLink

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
