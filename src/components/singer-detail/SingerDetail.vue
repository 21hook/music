<template>
    <transition name="slide">
      <!-- animated object -->
      <music-list></music-list>
    </transition>
</template>

<script>
import MusicList from 'components/music-list/MusicList'
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong, processSongsUrl} from 'common/song'

export default {
  name: 'SingerDetail',
  components: {MusicList},
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
          processSongsUrl(this._normalizeSongs(res.data.list))
            .then(songs => this.songs = songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []

      list.forEach(item => {
        let {musicData} = item

        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })

      return ret
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
    /* keyframes */
  .slide-enter-active, slide-leave-active
    transition: all .3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
