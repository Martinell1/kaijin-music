<template>
  <div class="user-center">
    <div class="user-center__back" @click="backHandle">
      <i class="iconfont icon-back"></i>
    </div>
    <div class="switches-wrapper">
      <Switches :items="['我喜欢的', '最近播放']"></Switches>
    </div>
    <div class="user-center__play" @click="randomHandle">
      <i class="iconfont icon-play"></i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list-wrapper">
      <Scroll class="list-scroll" v-if="type === 0">
        <div class="list-inner">
          <SongList :songList="favoriteList" @select="selectSong"></SongList>
        </div>
      </Scroll>
    </div>
    <div class="list-wrapper">
      <Scroll class="list-scroll" v-if="type === 1">
        <div class="list-inner">
          <SongList :songList="playHistory" @select="selectSong"></SongList>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed } from 'vue'
import Switches from '../components/base/switches/switches.vue'
import Scroll from '../components/base/scroll/scroll.vue'
import SongList from '../components/song-list.vue/song-list.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const type = ref(0)
provide('type', type)

const favoriteList = computed(() => store.state.favoriteList)
const playHistory = computed(() => store.state.playHistory)

const router = useRouter()
const backHandle = () => {
  router.back()
}
const store = useStore()
const selectSong = ({ song, index }) => {
  store.dispatch('addSong', song)
}

const randomHandle = () => {
  store.dispatch('randomPlay', type.value === 0 ? store.state.favoriteList : store.state.playHistory)
}

</script>
<style lang='scss' scoped>
.user-center {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background: $color-background;

  .switches-wrapper {
    padding: 10px 0;
  }

  &__back {
    position: absolute;
    line-height: 50px;
    margin-left: 10px;
  }

  &__play {
    text-align: center;
    border-top: 1px solid $color-highlight-background;
    border-bottom: 1px solid $color-highlight-background;
    height: 48px;
    line-height: 50px;

    .icon-play {
      font-size: $font-size-small;
      margin-right: 5px;
    }
  }
}

.list {
  &-wrapper {
    position: fixed;
    top: 100px;
    bottom: 40px;
  }

  &-scroll {
    height: 100%;
    overflow: hidden;
  }
}
</style>
