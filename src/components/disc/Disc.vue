<template>
    <div class="slide">
      {{ disc.dissname }}
      {{ disc.imgurl }}
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'
import {createSong, processSongsUrl} from 'common/song'
import {ERR_OK} from 'api/config'

export default {
  name: 'Disc',
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
  .slide
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background-color: #222
</style>
