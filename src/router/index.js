import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'components/recommend/Recommend'
import Singer from 'components/singer/Singer'
import Search from 'components/search/Search'
import Rank from 'components/rank/Rank'
import UserCenter from 'components/user-center/UserCenter'
import SingerDetail from 'components/singer-detail/SingerDetail'
import PlayerList from 'components/player-list/PlayerList'
import AddSong from 'components/add-song/AddSong'

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
    },
    {
      path: '/user',
      component: UserCenter
    },
    {
      path: '/player-list',
      component: PlayerList
    },
    {
      path: '/add-song',
      component: AddSong
    }
  ]
})
