import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'assets/css/index.styl' // import the global style

Vue.config.productionTip = false

// 解决移动端300毫秒延时
fastclick.attach(document.body)

// install the vue plugin; lazy load for vue components
Vue.use(VueLazyLoad, {
  loading: require('assets/images/default.png') // 懒加载默认图片
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
