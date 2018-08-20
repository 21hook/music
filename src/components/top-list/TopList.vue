<template>
  <transition name="slide">
      <!-- animated object -->
      <music-list :rank="rank"
                  :title="title"
                  :bg-image="bgImage"
                  :songs="songs">
      </music-list>
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
      songs: [],
      rank: true
    }
  },
  created() {
    this._getMusicList()
  },
  computed: {
    // the component object accessors/getters
    title() {
      // access a component object of the type
      // return a new object of a different type
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    },
    ...mapGetters(['topList'])
  },
  methods: {
    // private methods
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
  .slide-enter-active, slide-leave-active
    transition: all .3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
