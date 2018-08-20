<template>
  <div class="search-list" v-show="searches.length">
    <li v-for="(item, i) in searches" :key="i">
      <span class="text">{{ item }}</span>
      <span class="icon">
        <i class="icon-delete"></i>
      </span>
    </li>
  </div>
</template>

<script>
export default {
  name: 'SearchList',
  props: {
    searches: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"

  .search-list
    .search-item
      display: flex
      align-items: center
      height: 40px
      overflow: hidden
      &.list-enter-active, &.list-leave-active  // 动画
        transition: all 0.1s
      &.list-enter, &.list-leave-to
        height: 0
      .text
        flex: 1
        color: $color-text-l
      .icon
        extend-click()
        .icon-delete
          font-size: $font-size-small
          color: $color-text-d
</style>
