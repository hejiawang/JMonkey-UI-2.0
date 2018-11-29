// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import animated from 'animate.css'
import '@/assets/css/app.scss'
import '@/assets/css/iview.scss'
import 'babel-polyfill'

import CDelete from './plugins/deleteModal/index'
import CViladate from './plugins/validate/index'

Vue.config.productionTip = false

Vue.use(iView, {
  transfer: true,
  size: 'large'
})
Vue.use(animated)
Vue.use(CDelete)
Vue.use(CViladate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
