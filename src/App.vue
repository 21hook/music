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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
