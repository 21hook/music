<template>
  <div class="rank">
    <scroll class="toplist" :data="topList">
      <!-- the element to be scrolled -->
      <ul>
        <li v-for="(item, i) in topList" :key="i" class="item" @click="selectItem(item)">
          <div class="icon">
            <img v-lazy="item.picUrl" width="100" height="100">
          </div>
          <ul class="songlist">
            <li v-for="(song, i) in item.songList" :key="i" class="song">
              <span>{{i + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
        <div class="loading-container" v-show="!topList.length">
          <loading></loading>
        </div>
      </ul>
    </scroll>
    <!-- child component outlet; render it here -->
    <router-view></router-view>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Loading from 'base/loading/Loading'
import Scroll from 'base/scroll/Scroll'
import {getTopList} from 'api/rank'
import {ERR_OK} from 'api/config'

export default {
  name: 'Rank',
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      topList: []
    }
  },
  created() {
    this._getTopList()
  },
  methods: {
    // private methods
    _getTopList() {
      getTopList().then(res => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList
        }
      })
    },
    // event handlers
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })

      this.setTopList(item)
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"
  @import "~assets/css/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
