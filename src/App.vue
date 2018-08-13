<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- component outlet -->
    <router-view/>
  </div>
</template>

<script>
import MHeader from 'components/m-header/MHeader'
import Tab from 'components/tab/Tab'

export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style>
  /* the global style(more than one component, used) goes here! */
</style>
