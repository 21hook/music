<template>
    <ul class="switches">
      <li v-for="(item, i) in switches"
          :key="i"
          :class="{'active': currentIndex === i}"
          class="switch-item"
          @click="switchItem(i)">
        <span>{{ item.name }}</span>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'Switches',
  props: {
    switches: {
      type: Array,
      default() {
        return []
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // event handlers
    // mouse event handlers
    switchItem(index) {
      this.$emit('switch', index)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"

  .switches
    display: flex
    align-items: center
    width: 240px
    margin: 0 auto
    border: 1px solid $color-highlight-background
    border-radius: 5px
    .switch-item
      flex: 1
      padding: 8px
      text-align: center
      font-size: $font-size-medium
      color: $color-text-d
      &.active
        background: $color-highlight-background
        color: $color-text
</style>
