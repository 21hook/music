<template>
  <transition name="slide">
      <!-- animated object -->
      <music-list></music-list>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import MusicList from 'components/music-list/MusicList'
import {getMusicList} from 'api/rank'
import {createSong, processSongsUrl} from 'common/song'
import {ERR_OK} from 'api/config'

export default {
  name: 'TopList',
  components: {MusicList},
  data() {
    return {
      songs: {}
    }
  },
  created() {
    this._getMusicList()
  },
  computed: {
    ...mapGetters(['topList'])
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.songlist))
            .then(songs => this.songs = songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
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
  .top-list
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color: #222
    /* keyframes */
  .slide-enter-active, slide-leave-active
    transition: all .3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
