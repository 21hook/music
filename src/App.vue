<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- store the dom tree for future requests(dom tree cache) -->
    <keep-alive>
      <!-- component outlet -->
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/MHeader'
import Tab from 'components/tab/Tab'
import Player from 'components/player/Player'

export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style>
  /* the global style(more than one component, used) goes here! */
</style>
