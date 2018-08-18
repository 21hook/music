import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'components/recommend/Recommend'
import Singer from 'components/singer/Singer'
import Search from 'components/search/Search'
import Rank from 'components/rank/Rank'
import UserCenter from 'components/user-center/UserCenter'
import Disc from 'components/disc/Disc'
import TopList from 'components/top-list/TopList'
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
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
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
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
