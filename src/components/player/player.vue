<template>
  <div class="player">
    <div class="player--normal" v-show="fullScreen">
      <div class="player__background">
        <img src="../../assets/images/cover.png" />
      </div>
      <div class="player__top">
        <div class="player__back" @click="backHandle">
          <i class="iconfont icon-back"></i>
        </div>
        <h1 class="player__title">{{ currentSong.name }}</h1>
        <h2 class="player__subtitle" v-if="currentSong.ar">{{ currentSong.ar[0].name }}</h2>
      </div>
      <div class="player__bottom">
        <div class="player__oper">
          <div class="player__oper__icon">
            <i class="iconfont" :class="modeIcon" @click="modeChangeHandle"></i>
          </div>
          <div class="player__oper__icon" :class="iconDisable">
            <i class="iconfont icon-prev" @click="prevHandle"></i>
          </div>
          <div class="player__oper__icon player__oper__icon--main" :class="iconDisable">
            <i
              class="iconfont icon-play"
              :class="{ 'icon-play': !playing, 'icon-pause': playing }"
              @click="togglePlayHandle"
            ></i>
          </div>
          <div class="player__oper__icon" :class="iconDisable">
            <i class="iconfont icon-next" @click="nextHandle"></i>
          </div>
          <div class="player__oper__icon">
            <i class="iconfont icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    <audio ref="audioRef" @pause="pauseHandle" @canplay="ready" @error="error"></audio>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { getMusicUrl } from '../../api/api'
import useMode from './use-mode'
const store = useStore()

const useStyleEffect = () => {
  const fullScreen = computed(() => store.state.fullScreen)

  const backHandle = () => {
    store.commit('setFullScreen', false)
  }

  const iconDisable = computed(() => {
    return onReady.value ? '' : 'player__oper__icon--disable'
  })

  const { modeIcon, modeChangeHandle } = useMode()

  return { fullScreen, backHandle, iconDisable, modeIcon, modeChangeHandle }
}

const { fullScreen, backHandle, iconDisable, modeIcon, modeChangeHandle } = useStyleEffect()

const usePlayEffect = () => {
  const currentSong = computed(() => store.getters.currentSong)
  const playing = computed(() => store.state.playing)
  const currentIndex = computed(() => store.state.currentIndex)
  const playlist = computed(() => store.state.playlist)

  const onReady = ref(false)

  const audioRef = ref(null)

  const getMusicData = async (id) => {
    const { data: result } = await getMusicUrl(id)

    return result.data[0].url
  }

  const togglePlayHandle = () => {
    store.commit('setPlayState', !playing.value)
  }

  const pauseHandle = () => {
    store.commit('setPlayState', false)
  }

  const ready = () => {
    if (onReady.value) {
      return
    }
    onReady.value = true
  }

  const error = () => {
    onReady.value = true
  }

  const shiftMusic = (ShiftHandle) => {
    const list = playlist.value
    if (!onReady.value || !list) {
    } else if (list.length === 1) {
      loop()
    } else {
      const index = ShiftHandle()

      store.commit('setCurrentIndex', index)
      if (!playing.value) {
        store.commit('setPlayState', true)
      }
    }
  }

  const prevHandle = () => {
    shiftMusic(() => {
      let index = currentIndex.value - 1
      if (index === -1) {
        index = playlist.value.length - 1
      }
      return index
    })
  }

  const nextHandle = () => {
    shiftMusic(() => {
      let index = currentIndex.value + 1
      if (index === playlist.value.length) {
        index = 0
      }
      return index
    })
  }

  const loop = () => {
    const audioEl = audioRef.value
    audioEl.currentTime = 0
  }

  return {
    audioRef,
    currentSong,
    playing,
    onReady,
    ready,
    error,
    getMusicData,
    togglePlayHandle,
    pauseHandle,
    prevHandle,
    nextHandle
  }
}

const {
  audioRef,
  currentSong,
  playing,
  onReady,
  ready,
  error,
  getMusicData,
  togglePlayHandle,
  pauseHandle,
  prevHandle,
  nextHandle
} = usePlayEffect()

watch(currentSong, async (newSong) => {
  onReady.value = false
  console.log(newSong.id)
  if (!newSong.id) {
    return
  }
  const url = await getMusicData(newSong.id)

  const audioEl = audioRef.value
  audioEl.src = url
  audioEl.play()
})

watch(playing, (newPlaying) => {
  if (!onReady.value) {
    return
  }
  const audioEl = audioRef.value
  newPlaying ? audioEl.play() : audioEl.pause()
})

</script>
<style lang='scss' scoped>
.player {
  &--normal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background-color: $color-background;
  }

  &__background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__top {
    margin: 10px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $color-theme;
  }

  &__back {
    position: absolute;
    left: 10px;
    z-index: 50;
    transform: rotate(-90deg);
  }

  &__title {
    font-size: $font-size-large;
    margin-bottom: 10px;
  }

  &__bottom {
    position: absolute;
    bottom: 50px;
    width: 100%;
  }

  &__oper {
    display: flex;
    align-items: center;

    &__icon {
      flex: 1;
      color: $color-theme;
      text-align: center;

      i {
        font-size: $font-size-large-x;
      }

      &--main {
        transform: scale(1.5);
      }

      &--disable {
        color: $color-theme-d;
      }
    }
  }
}
</style>
