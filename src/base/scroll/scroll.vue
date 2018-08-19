<template>
    <div ref="wrapper">
      <!-- default slot; the first child component to be scrolled -->
      <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: { // 当 probeType 为 1 的时候，会在屏幕滑动停止的时候派发 scroll 事件
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: { // 是否监听滚动事件
      type: Boolean,
      default: false
    },
    data: { // 数据
      type: Array,
      default: null
    },
    pullup: { // 上拉获取数据
      type: Boolean,
      default: false
    },
    beforeScroll: { // 开始滚动前
      type: Boolean,
      default: false
    },
    refreshDelay: { // 刷新延时时间
      type: Number,
      default: 20
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }

      // init the plugin on the wrapper, with the functionality opt
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })

      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }

      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }

      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh() // call refresh() of the plugin
    }
  },
  watch: {
    /*
      watch data => template re-render => refresh
      watch data to recalculate the height of the content element
     */
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style scoped>

</style>
