<template>
  <div>
    {{ topList }}
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'TopList',
  created() {
    this._getMusicList()
  },
  computed: {
    ...mapGetters(['topList'])
  },
  methods: {
    _getMusicList() {
    }
  }
}
</script>

<style scoped>

</style>
