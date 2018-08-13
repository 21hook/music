<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
        <slider>
          <!-- default slot content -->
          <div v-for="(item, i) in recommends" :key="i">
            <a :href="item.linkUrl">
              <img class="needsclick" :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
    </div>
    <div class="recommend-list">
      <h1 class="list-title">热门歌单列表</h1>
      <ul></ul>
    </div>
  </div>
</template>

<script>
import Slider from 'base/slider/Slider'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  name: 'Recommend',
  components: {
    Slider
  },
  data() {
    return {
      recommends: []
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    // _helperMethod # private methods in the module
    _getRecommend() {
      getRecommend().then(res => { // resolved value in the jsonp promise
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    }
    // event handlers
  }
}
</script>

<style scoped>

</style>
