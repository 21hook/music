import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'components/recommend/Recommend'
import Singer from 'components/singer/Singer'
import Search from 'components/search/Search'
import Rank from 'components/rank/Rank'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', // site root path
      name: 'HelloWorld'
    },
    // route/component direct mapping
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/Singer',
      component: Singer
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/rank',
      component: Rank
    }
  ]
})
