<template>
  <scroll class="suggest" :data="result">
    <ul class="suggest-list">
      <li v-for="(item, i) in result" :key="i" class="suggest-item">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore"></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper"> <!--边界处理无数据情况-->
      抱歉，暂无搜索结果
    </div>
  </scroll>
</template>

<script>
import Loading from 'base/loading/Loading'
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {createSong, processSongsUrl} from 'common/song'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  name: 'Suggest',
  components: {Loading},
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      pullup: true, // 表示需要上拉刷新
      beforeScroll: true,
      hasMore: true, // 还有更多
      result: [] // 搜索结果
    }
  },
  methods: {
    // private methods
    _search() {
      this.page = 1
      this.hasMore = true

      search(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._genResult(res.data))
            .then(songs => this.result = songs)
          this._checkMore(res.data)
        }
      })
    },
    _genResult(data) { // 处理结果数据
      let ret = []
      if (data.zhida && data.zhida.singerid) { // 歌手数据
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    _normalizeSongs(list) { // 数据处理，处理歌曲数据
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    _checkMore(data) { // 检测是否还有更多数据
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
    },
    // public methods
    getIconCls(item) { // 搜索结果列表前小图标类型判断（歌手或歌曲）
      if (item.type === TYPE_SINGER) { // 判断搜索出来的数据类型是不是歌手
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) { // 搜索结果列表name处理
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    }
  },
  watch: {
    query(newQuery) {
      this._search(newQuery)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"
  @import "~assets/css/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
