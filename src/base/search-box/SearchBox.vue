<template>
  <div class="search-box">
    <i class="icon-search">
      <!-- sync this.query when the change event occurs, rather than the input event -->
      <input v-model.lazy="query" class="box" :placeholder="placeholder">
      <i class="icon-dismiss"></i>
    </i>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
  },
  watch: {
    query(newQuery) {
      // pass the value attribute of the input element,
      // to the query props fo the suggest element
      this.$emit('query', newQuery)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"

  .search-box
    display: flex  //采用flex布局，自适应宽度
    align-items: center  //交叉轴上居中
    box-sizing: border-box  //border和padding计算入width之内
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder   // 默认提示文字的颜色
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
