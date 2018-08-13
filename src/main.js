import Vue from 'vue'
import App from './App'
import router from './router'

import 'assets/css/index.styl' // import the global style

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
