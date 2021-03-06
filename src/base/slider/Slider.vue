<template>
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <!-- default slot for slider content -->
        <slot></slot>
      </div>
      <div class="dots">
        <span v-for="(item, i) in dots"
              :key="i"
              class="dot"
              :class="{active: currentPageIndex === i}">
        </span>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/dom'

export default {
  name: 'Slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  // when <keep-alive/> is actived, the hook of its dynamic components, called
  activated() {
    if (this.autoPlay) {
      this._play()
    }
  },
  // when <keep-alive/> is deactivated, the hook of its dynamic components, called
  deactivated() {
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    // _helperMethod # private methods in the modules
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    /*
      循环滚动
      array
      -1 | 0 | 1 | 2
           ↑
        dot index

    => element shift, one position to left or right, circularly
      -1 | 0 | 1 | 2
           ↑
        dot index
   */
    _initSlider() {
      // extend the scroll functionality for a component using its opts(a plugin)
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
          /*
            dot index transition(state transition):

            ↓-----------↓
            0 <-> 1 <-> 2
           */
          this._play()
        }
      })

      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          /*
            scroll 1 to 2 by click(user interactions),
            then scroll 1 to 2 again by auto-play(procedural animations)
            => produce identical scroll animations

            !! Disable procedural animations before user interactions to the animated
            object, to produce consistent animations.
           */
          clearTimeout(this.timer)
        }
      })
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"

  .slider
    min-height: 1px
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
