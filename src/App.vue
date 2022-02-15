<template>
  <Tab />
  <router-view :style="viewStyle" />
  <Player></Player>
</template>

<script setup>
import Tab from './components/tab/tab.vue'
import Player from './components/player/player.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const playlist = computed(() => store.state.playlist)
const viewStyle = computed(() => {
  const bottom = playlist.value.length ? '60px' : 0
  return {
    bottom
  }
})
</script>
<style lang='scss' scoped>
</style>
