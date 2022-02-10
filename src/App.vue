<template>
  <Tab />
  <router-view />
  <Player></Player>
</template>

<script setup>
import Tab from './components/tab/tab.vue'
import Player from './components/player/player.vue'
</script>
<style lang='scss' scoped>
</style>
