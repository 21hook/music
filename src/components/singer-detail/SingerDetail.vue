<template>
    <div class="detail">
      {{ singer.name }}
      {{ singer.avatar }}
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'

export default {
  name: 'SingerDetail',
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSingerDetail()
  },
  computed: {
    // spread the getters of the store state
    // establish getter/computed_property direct mapping
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    // _privateMethod
    _getSingerDetail() {
      if (!this.singer.id) { // 这里的this.singer数据 是通过vuex获取的，所以在歌手详情页刷新的话会获取不到数据，在此做判断做回退操作(边距数据的处理)
        this.$router.push('/singer')
        return
      }

      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .detail
    position: fixed
    z-index: 1000
    top: 0
    right: 0
    bottom: 0
    left: 0
    background-color: #222
</style>
