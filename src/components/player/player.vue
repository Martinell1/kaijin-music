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
      <div class="player__middle">
        <div class="player__middle--left">
          <div class="player__cd__wrapper">
            <div class="player__cd" ref="cdRef">
              <img class="image" :class="cdState" ref="imgRef" src="../../assets/images/cover.png" />
            </div>
          </div>
        </div>
        <div class="player__middle--right">
          <Scroll class="player__lyric__scroll">
            <div class="player__lyric__wrapper">
              {{ 'currentLineNum' + currentLineNum }}
              <div v-if="currentLyric">
                <p
                  class="player__lyric__text"
                  :class="{ 'player__lyric__text--current': currentLineNum === index }"
                  v-for="(line, index) in currentLyric.lines"
                  :key="line.num"
                >{{ line.txt }}</p>
              </div>
            </div>
          </Scroll>
        </div>
      </div>
      <div class="player__bottom">
        <div class="player__progress__wrapper">
          <span
            class="player__progress__time player__progress__time--left"
          >{{ formatTime(currentTime) }}</span>
          <div class="player__progress__bar">
            <ProgressBar
              :progress="progress"
              @progress-changing="onProgressChanging"
              @progress-changed="onProgressChanged"
            />
          </div>
          <span
            class="player__progress__time player__progress__time--right"
          >{{ formatTime(currentSong.dt / 1000) }}</span>
        </div>
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
            <i
              class="iconfont"
              :class="getFavoriteIcon(currentSong)"
              @click="toggleFavorite(currentSong)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @pause="pauseHandle"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { getMusicUrl } from '../../api/api'
import useMode from './use-mode'
import useCd from './use-cd'
import useLyric from './use-lyric'
import useFavorite from './use-favorite'
import { formatTime } from '../../assets/js/util'
import ProgressBar from './progress-bar.vue'
import { PLAY_MODE } from '@/assets/js/constance'
import Scroll from '../base/scroll/scroll.vue'

const store = useStore()
// 样式
const useStyleEffect = () => {
  const fullScreen = computed(() => store.state.fullScreen)

  const backHandle = () => {
    store.commit('setFullScreen', false)
  }

  const iconDisable = computed(() => {
    return onReady.value ? '' : 'player__oper__icon--disable'
  })

  return { fullScreen, backHandle, iconDisable }
}
const { fullScreen, backHandle, iconDisable } = useStyleEffect()
// 播放模式
const { modeIcon, modeChangeHandle } = useMode()
// 收藏
const { getFavoriteIcon, toggleFavorite } = useFavorite()

// cd
const { cdState, cdRef, imgRef } = useCd()

// 进度条
const useProgress = () => {
  let progressChanging = false

  const currentTime = ref(0)

  const progress = computed(() => {
    return currentTime.value / currentSong.value.dt * 1000
  })

  const updateTime = (e) => {
    if (!progressChanging) {
      currentTime.value = e.target.currentTime
    }
  }

  // 进度条拖动
  const onProgressChanging = (progress) => {
    progressChanging = true
    currentTime.value = currentSong.value.dt * progress / 1000
  }

  const onProgressChanged = (progress) => {
    progressChanging = false
    audioRef.value.currentTime = currentTime.value = currentSong.value.dt / 1000 * progress
    if (!playing.value) {
      store.commit('setPlayState', true)
    }
  }

  return { currentTime, progress, updateTime, onProgressChanging, onProgressChanged }
}
const { currentTime, progress, updateTime, onProgressChanging, onProgressChanged } = useProgress()

// 播放
const usePlayEffect = () => {
  const currentSong = computed(() => store.getters.currentSong)
  const playing = computed(() => store.state.playing)
  const currentIndex = computed(() => store.state.currentIndex)
  const playlist = computed(() => store.state.playlist)
  const playMode = computed(() => store.state.playMode)

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
    playLyric()
  }

  const error = () => {
    onReady.value = true
  }

  const end = () => {
    currentTime.value = 0
    if (playMode.value === PLAY_MODE.loop) {
      loop()
    } else {
      nextHandle()
    }
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
    audioEl.play()
    store.commit('setPlayState', true)
  }

  return {
    audioRef,
    currentSong,
    playing,
    onReady,
    ready,
    error,
    end,
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
  end,
  getMusicData,
  togglePlayHandle,
  pauseHandle,
  prevHandle,
  nextHandle
} = usePlayEffect()

// 歌词
const { currentLyric, currentLineNum, playLyric } = useLyric({ onReady, currentTime })

// 切换新歌
watch(currentSong, async (newSong) => {
  onReady.value = false
  if (!newSong.id) {
    return
  }
  currentTime.value = 0
  const url = await getMusicData(newSong.id)

  const audioEl = audioRef.value
  audioEl.src = url
  audioEl.play()
})
// 切换播放模式
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

  &__middle {
    position: fixed;
    width: 100%;
    top: 80px;
    bottom: 170px;
    white-space: nowrap;

    &--left {
      display: inline-block;
      vertical-align: top;
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 80%;
      display: none;
    }

    &--right {
      display: inline-block;
      vertical-align: top;
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }

  &__cd {
    width: 100%;
    height: 100%;
    border-radius: 50%;

    &__wrapper {
      position: absolute;
      left: 10%;
      top: 0;
      width: 80%;
      box-sizing: border-box;
      height: 100%;
    }

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid rgba(255, 255, 255, 0.1);
    }

    &--playing {
      animation: rotate 20s linear infinite;
    }
  }

  &__lyric {
    width: 100%;
    height: 100%;

    &__wrapper {
      position: absolute;
      left: 10%;
      top: 0;
      width: 80%;
      box-sizing: border-box;
    }

    &__text {
      text-align: center;
      margin: 20px 0;
      height: 20px;
      color: $color-text-d;

      &--current {
        color: $color-text;
      }
    }

    &__scroll {
      height: 100%;
    }
  }

  &__bottom {
    position: absolute;
    bottom: 52px;
    width: 100%;
  }

  &__progress {
    &__wrapper {
      display: flex;
      align-items: center;
      width: 90%;
      margin: 0 auto;
      padding: 10px 0;
    }
    &__time {
      color: $color-text;
      font-size: $font-size-small;
      flex: 0 0 40px;
      width: 40px;
      line-height: 30px;

      &--left {
        text-align: left;
      }

      &--right {
        text-align: right;
      }
    }

    &__bar {
      flex: 1;
    }
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
