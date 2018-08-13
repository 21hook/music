import Vue from 'vue'
import Router from 'vue-router'
import MHeader from 'components/m-header/MHeader'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // route/component direct mapping
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: MHeader
    }
  ]
})
