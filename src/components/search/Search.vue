<template>
  <div class="search">
    <div class="search-box-wrapper">
      <input type="text" @change="onSearch">
    </div>
    <div class="shortcut-wrapper">
      <scroll class="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li v-for="(item, i) in hotKey" :key="i" class="item">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history">
            <h1 class="title">
              <span>搜索历史</span>
              <span class="clear">
              <i class="icon-clear"></i>
            </span>
            </h1>
            search-list
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result">
      <suggest :query="query"></suggest>
    </div>
    <!-- child component outlet; render it here -->
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/Scroll'
import Suggest from 'components/suggest/Suggest'
import {getHotKey} from 'api/search'
import {ERR_OK} from 'api/config'

export default {
  name: 'Search',
  components: {
    Scroll,
    Suggest
  },
  data() {
    return {
      hotKey: [],
      query: ''
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    // private methods
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    // event handler
    onSearch(e) {
      console.log(e)
      this.query = e.target.value
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"
  @import "~assets/css/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
