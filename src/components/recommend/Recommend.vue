<template>
  <div>
    <div v-for="(item, i) in recommends" :key="i">
      <a :href="item.linkUrl">
        <img class="needsclick" @load="loadImage" :src="item.picUrl">
      </a>
    </div>
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  name: 'Recommend',
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
  }
}
</script>

<style scoped>

</style>
