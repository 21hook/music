<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag">
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box placeholder="搜索歌曲"></search-box>
      </div>
      <div class="shortcut">
        <switches></switches>
        <div class="list-wrapper">
          <scroll class="list-scroll">
            <div class="list-inner">
              play recently
            </div>
          </scroll>
          <scroll class="list-scroll">
            <div class="list-inner">
              search list
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result">

      </div>
      <div class="tip-title">
        <i class="icon-ok"></i>
        <span class="text">1首歌曲已经添加到播放列表</span>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/Scroll'
import Switches from 'base/switches/Switches'
import SearchBox from 'base/search-box/SearchBox'

export default {
  name: 'AddSong',
  components: {
    Scroll,
    Switches,
    SearchBox
  },
  data() {
    return {
      showFlag: true
    }
  },
  methods: {
    // public methods
    show() {
      this.showFlag = true
    },
    // event handlers
    // mouse event handlers
    hide() {
      // conditional display to trigger the reversed transition
      this.showFlag = false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"
  @import "~assets/css/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>
