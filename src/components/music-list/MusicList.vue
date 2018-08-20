<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" ref="bgImage" :style="bgStyle">
      <div class="play-wrapper">
        <div class="play" ref="playBtn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div> <!--背景图过滤蒙板-->
    </div>
    <div class="bg-layer" ref="layer"></div> <!--背景层（歌曲列表向上滚动时跟着生成的蒙板层）-->
    <scroll class="list"
            ref="list"
            :data="songs"
            :probe-type="3"
            :listen-scroll="true"
            @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs" :rank="rank"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from 'base/song-list/SongList'
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'
import {prefixStyle} from 'common/dom'

const RESERVED_HEIGHT = 40 // 预留高度
const transform = prefixStyle('transform') // 加前缀
const backdrop = prefixStyle('backdrop-filter') // 加前缀

export default {
  name: 'MusicList',
  components: {
    SongList,
    Scroll,
    Loading
  },
  props: {
    songs: {
      type: Array,
      default() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight // 图片的高度
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT // 最小偏移
    this.$refs.list.$el.style.top = `${this.imageHeight}px` // 滚动区域距离顶部的距离
  },
  computed: {
    // a component object accessors/getters
    bgStyle() {
      // receive/access an object of the type
      // return a new object of different type
      return `background-image: url(${this.bgImage})`
    }
  },
  methods: {
    // event handlers
    // mouse event handlers
    back() {
      this.$router.back()
    },
    // scroll event handlers
    scroll(pos) {
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY(newVal) { // 通过监听scrollY的值变化
      let translateY = Math.max(this.minTransalteY, newVal) // 遮罩层最远可滚动的距离
      let scale = 1 // 图片放大
      let zIndex = 0 // 图片背景层的zIndex值(不设置该值，歌曲列表的文字图层就会高于图片)
      let blur = 0 // 高斯模糊
      const percent = Math.abs(newVal / this.imageHeight) // scale比例公式
      if (newVal > 0) { // 往下拉时图片比例的变化
        scale = 1 + percent
        zIndex = 10
      } else { // 往上滑动newVal为负值，背景图会有高斯模糊并逐渐加深
        blur = Math.min(20, percent * 20)
      }

      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
      this.$refs.filter.style[backdrop] = `blur(${blur}px)` // 只有ios手机支持这高斯模糊效果
      if (newVal < this.minTransalteY) { // 滚动到顶部（距离顶部还有40px），设置图片层级高于文字
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none' // playBtn是绝对定位的，若在此不隐藏掉，则当bgImage的高度变成40px时playBtn会定位在它上面
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"
  @import "~assets/css/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image   //头部背景图样式的设置
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
