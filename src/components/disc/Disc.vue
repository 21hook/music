<template>
    <div class="slide">
      {{ disc.dissname }}
      {{ disc.imgurl }}
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Disc',
  created() {},
  computed: {
    ...mapGetters(['disc'])
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background-color: #222
</style>
