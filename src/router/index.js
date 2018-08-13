import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // route/component direct mapping
  routes: [
    {
      path: '/', // site root path
      name: 'HelloWorld'
    }
  ]
})
