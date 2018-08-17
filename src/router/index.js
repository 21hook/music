import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'components/recommend/Recommend'
import Singer from 'components/singer/Singer'
import Search from 'components/search/Search'
import Rank from 'components/rank/Rank'
import SingerDetail from 'components/singer-detail/SingerDetail'

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
    // route/component direct mapping
    {
      path: '/singer',
      component: Singer,
      // route/component hashing mapping
      children: [
        {
          path: ':id', // !! :id
          component: SingerDetail
        }
      ]
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
