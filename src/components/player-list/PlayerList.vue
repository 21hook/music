<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag">
    <div class="list-wrapper">
      <div class="list-header">
        <h1 class="title">
          <i class="icon">
              <span class="text">
              </span>
              <span class="clear">
                <i class="icon-clear"></i>
              </span>
          </i>
        </h1>
      </div>
      <scroll class="list-content">
        <transition-group tag="ul" name="list">
          <li class="item">
            <i class="current"></i>
            <span class="text"></span>
            <span class="like">
                like
              </span>
            <span class="delete">
                delete
                <i class="icon-delete"></i>
              </span>
          </li>
        </transition-group>
      </scroll>
      <div class="list-operate">
        <div class="add" @click="addSong">
          <i class="icon-add"></i>
          <span class="text">添加歌曲到队列</span>
        </div>
      </div>
      <div class="list-close" @click="hide">
        <span>关闭</span>
      </div>
    </div>
      <confirm></confirm>
      <add-song ref="addSong"></add-song>
  </div>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/Scroll'
import Confirm from 'base/confirm/Confirm'
import AddSong from 'components/add-song/AddSong'

export default {
  name: 'PlayerList',
  components: {
    Scroll,
    Confirm,
    AddSong
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
    addSong() {
      this.$refs.addSong.show()
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"
  @import "~assets/css/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>
