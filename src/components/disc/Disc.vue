<template>
  <transition name="slide">
    <!-- context: dynamic components; must be the root element of it -->
    <music-list :songs="songs" :title="disc.dissname" :bg-image="disc.imgurl"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import MusicList from 'components/music-list/MusicList'
import {getSongList} from 'api/recommend'
import {createSong, processSongsUrl} from 'common/song'
import {ERR_OK} from 'api/config'

export default {
  name: 'Disc',
  components: {MusicList},
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSongList()
  },
  computed: {
    ...mapGetters(['disc'])
  },
  methods: {
    _getSongList() {
      getSongList(this.disc.dissid).then(res => {
        if (res.data.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.data.cdlist[0].songlist))
            .then(songs => this.songs = songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, slide-leave-active
    transition: all .3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
