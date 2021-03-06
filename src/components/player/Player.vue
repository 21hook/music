<template>
  <div class="player" v-show="playList.length">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img :src="currentSong.image" width="100%" height="100%">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back">
            </i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img :src="currentSong.image" class="image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric"></div>
            </div>
          </div>
          <scroll class="middle-r">
            <div class="lyric-wrapper">
              <p class="text"></p>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l"></span>
            <div class="progress-bar-wrapper">

            </div>
            <span class="time time-r"></span>
          </div>
          <div class="operators">
            <div class="icon i-left"><!--播放模式-->
              <i></i>
            </div>
            <div class="icon i-left"><!--上一首-->
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center"><!--播放、暂停切换-->
              <i></i>
            </div>
            <div class="icon i-right"><!--下一首-->
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right"><!--收藏-->
              <i class="icon"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div v-show="!fullScreen" class="mini-player" @click="open">
        <div class="icon">
          <img :src="currentSong.image" :class="cdCls" width="40" height="40">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          play, resume components
          <i class="icon-mini"></i> <!--@click.stop 阻止冒泡-->
        </div>
        <div class="control" @click.stop="showPlaylist">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <player-list ref="playlist"></player-list>
    <audio src=""></audio>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import animations from 'create-keyframe-animation'
import Scroll from 'base/scroll/Scroll'
import PlayerList from 'components/player-list/PlayerList'
import {prefixStyle} from 'common/dom'

const transform = prefixStyle('transform') // 加前缀

export default {
  name: 'Player',
  components: {
    Scroll,
    PlayerList
  },
  data() {
    return {
      fullScreen: true
    }
  },
  computed: {
    // getters for this object
    cdCls() { // 大小cd样式,用于控制cd是旋转还是不旋转
      return this.playing ? 'play' : 'play pause'
    },
    ...mapGetters([
      'playList',
      'currentIndex',
      'currentSong'
    ])
  },
  methods: {
    // private methods
    _getPosAndScale() { // 获取位置和缩放比，用于动画(大小CD过渡)
      const targetWidth = 40 // 目标宽度, 左下角小圆圈图
      const paddingLeft = 40 // 左部偏移
      const paddingBottom = 30 // 底部偏移
      const paddingTop = 80 // 大CD距离顶部的高度
      const width = window.innerWidth * 0.8 //  大CD的宽度
      const scale = targetWidth / width // 缩小比例
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom // (这里的Y轴跟我们平时的y轴刚好相反，所以是正数)
      return {
        x,
        y,
        scale
      }
    },
    // event handlers
    // mouse event handlers
    showPlaylist() {
      this.$refs.playlist.show()
    },
    back() {
      this.fullScreen = false
    },
    open() {
      this.fullScreen = true
    },
    // animations hooks
    enter(el, done) { // 1、vue为我们提供的钩子函数，用于实现特定动画效果。用js实现css3的动画效果
      const {x, y, scale} = this._getPosAndScale() // 对象解构赋值
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)` // 放大再缩小
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }

      animations.registerAnimation({ // 注册
        name: 'move',
        animation,
        presets: {
          duration: 400, // 间隔
          easing: 'linear' // 线性缓动
        }
      })

      animations.runAnimation(this.$refs.cdWrapper, 'move', done) // 运行  done回调函数执行的时候则跳到 afterEnter()
    },
    afterEnter() { // 2、vue为我们提供的钩子函数，用于实现特定动画效果
      animations.unregisterAnimation('move') // 取消注册
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) { // 3、vue为我们提供的钩子函数，用于实现特定动画效果
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      const {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done) // 监听 transitionend事件
    },
    afterLeave() { // 4、vue为我们提供的钩子函数，用于实现特定动画效果
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"
  @import "~assets/css/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite  // cd旋转
              &.pause
                animation-play-state: paused  // 停止旋转
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
