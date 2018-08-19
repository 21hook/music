<template>
  <scroll class="listview"
          ref="listview"
          :data="data"
          :probe-type="3"
          :listen-scroll="true"
          @scroll="scroll">
    <ul>
      <li v-for="(group, i) in data" :key="i" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li v-for="(item, key) in group.items"
              :key="key"
              class="list-group-item"
              @click="selectItem(item)">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut"
         @touchstart.stop.prevent="onShortcutTouchStart"
         @touchmove.stop.prevent="onShortcutTouchMove"
         @touchend.stop>
      <ul>
        <li v-for="(item, i) in shortcutList"
            :key="i"
            :data-index="i"
            :class="{'current': currentIndex === i}"
            class="item">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle"> <!-- 当前悬浮标题 -->
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <!-- data does fetch correctly, hide <loading/> -->
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'
import {getData} from 'common/dom'

const TITLE_HEIGHT = 30 // title高度
const ANCHOR_HEIGHT = 18 // 右侧每个字母锚点的高度(A,B,C,D,E)

export default {
  name: 'Listview',
  components: {
    Scroll,
    Loading
  },
  props: {
    data: {
      type: Array,
      default() { // must be a function, required by extends: ['plugin:vue/essential'] of this version
        return []
      }
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created() { // data, that no need to watch
    this.touch = {}
    this.listHeight = []
  },
  computed: {
    shortcutList() {
      return this.data.map(group => group.title.substr(0, 1))
    },
    fixedTitle() {
      if (this.scrollY > 0) { // 已处于最顶部（this.scrollY==0），再往下拉，this.scrollY > 0
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    // private methods
    _calculateHeight() { // 计算高度（计算出每个字母类别下对应高度并生成数组）
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _scrollTo(index) {
      if (!index && index !== 0) { // 解决onShortcutTouchStart点击［‘热’，A,B,C...Z］最上端及底部存在bug(此时返回的index的值是null,需要过滤掉)
        return
      }
      if (index < 0) { // 滑动到最顶部（超出了字母“热”）
        index = 0
      } else if (index > this.listHeight.length - 2) { // 滑动到最底部 index > 24 - 2 (超出了字母“Z”)
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index] // 手动设置得到scrollY
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0) // 滚动到指定的目标元素（第二个参数是缓动的动画时间）
    },
    // event handlers
    // mouse event handlers
    selectItem(item) {
      this.$emit('select', item) // dispatch select message type & arg
    },
    // touch event handlers
    onShortcutTouchStart(e) {
      let anchorIndex = Number.parseInt(getData(e.target, 'index')) // 获取当前索引值
      let firstTouch = e.touches[0] // 获取第一个触点

      this.touch.y1 = firstTouch.pageY // 页面触点Y坐标
      this.touch.anchorIndex = anchorIndex // 当前锚点索引
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 // 滑动后所到的锚点位置（|0向下取整）
      let anchorIndex = Number.parseInt(this.touch.anchorIndex) + delta // 得到滑动后的锚点索引

      this._scrollTo(anchorIndex)
    },
    // <scroll/> event handlers
    scroll(pos) { // scroll.vue组件会派发一个scroll事件出来，用于接收滚动的位置，在此做接收( @scroll="scroll" )
      this.scrollY = pos.y // 通过scroll事件得到scrollY
    }
  },
  watch: {
    data() { // watch data change by props, 延时监听歌手列表的高度
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) { // watch data change by user interactions, 计算出 currentIndex 索引值
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }

      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY // 差值，用于fixedTitle
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限 (24-2), currentIndex=[0,1,2,3....22]
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) { // watch data changes by user interactions, 通过diff的变化设置偏移量
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
