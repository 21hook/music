// combine the mixin opt into a component opt # composition
export const playlistMixin = {
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() { // 当从keep-alive切换过来的时候会触发这个事件
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) { // 监听playlist
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() { // 处理playlist (引入playlistMixin的地方都必须调用handlePlaylist方法)
      throw new Error('component must implement handlePlaylist method') // 抛出异常
    }
  }
}

// combine the mixin opt into a component opt # composition
export const searchMixin = {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    onQueryChange(query) {
      this.query = query
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    }
  }
}
