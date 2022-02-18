<template>
  <Header></Header>
  <Tab />
  <router-view :style="viewStyle" v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component"></component>
    </KeepAlive>
  </router-view>

  <router-view name="user" :style="viewStyle" v-slot="{ Component }">
    <transition appear name="slide">
      <KeepAlive>
        <component :is="Component"></component>
      </KeepAlive>
    </transition>
  </router-view>
  <Player></Player>
</template>

<script setup>
import Tab from './components/tab/tab.vue'
import Player from './components/player/player.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import Header from './components/header/header.vue'
const store = useStore()
const playlist = computed(() => store.state.playlist)
const viewStyle = computed(() => {
  const bottom = playlist.value.length > 0 ? '60px' : 0
  return {
    bottom
  }
})

</script>
<style lang='scss' scoped>
</style>
