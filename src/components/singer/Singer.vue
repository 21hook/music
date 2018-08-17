<template>
  <div class="singer">
    <!-- when data fetch correctly(data watch), render <list-view/> -->
    <list-view :data="singers" @select="selectSinger"></list-view> <!-- subscribe select event -->
    <!-- for /singer/:id; component outlet -->
    <router-view></router-view>
  </div>
</template>

<script>
import SingerDetail from 'components/singer-detail/SingerDetail'
import ListView from 'base/listview/ListView'
import {mapMutations} from 'vuex'
import Singer from 'common/singer'
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  name: 'Singer',
  components: {
    ListView,
    SingerDetail
  },
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    // _privateMethod
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) { // 数据聚合整理［热门，a,b,c,d...］
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      // 为了得到有序列表，我们需要处理 map
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    selectSinger(singer) {
      this.$router.push({ // push to the history stack
        path: `/singer/${singer.id}`
      })

      this.setSinger(singer) // call the mutation as a method
    },
    // spread the mutations of the app state
    // establish mutation/method direct mapping
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
