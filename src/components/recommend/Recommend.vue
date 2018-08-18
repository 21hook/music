<template>
  <div class="recommend">
    <scroll class="recommend-content" ref="scroll" :data="discList">
      <!-- slot content; the root component to be scroll -->
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <!-- default slot content -->
            <div v-for="(item, i) in recommends" :key="i">
              <a :href="item.linkUrl">
                <!-- 当fastclick 跟bscroll的click事件冲突，导致无法点击； 此时增加class="needsclick"使得能够点击，这是fastclick 里的技巧 -->
                <img class="needsclick" :src="item.picUrl" @load="loadImage">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单列表</h1>
          <ul>
            <li v-for="(item, i) in discList" :key="i" class="item" @click="selectItem(item)">
              <div class="icon">
                <!-- load images when it is needed -->
                <img v-lazy="item.imgurl" alt="" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <!-- child component outlet; render it here -->
    <router-view></router-view>
  </div>
</template>

<script>
import Slider from 'base/slider/Slider'
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  name: 'Recommend',
  components: {
    Slider,
    Scroll,
    Loading
  },
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    // _helperMethod # private methods in the module
    _getRecommend() {
      getRecommend().then(res => { // resolved value in the jsonp promise
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then(res => { // resolved response data
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    // event handlers
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
