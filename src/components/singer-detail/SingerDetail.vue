<template>
    <div>
      {{ singer.name }}
      {{ singer.avatar }}
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'SingerDetail',
  computed: {
    // spread the getters of the store state
    // establish getter/computed_property direct mapping
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
