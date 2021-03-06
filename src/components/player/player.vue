<template>
  <div class="player" v-show="playlist.length">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
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
        <div
          class="player__middle"
          @touchstart.prevent="onMiddleTouchStart"
          @touchmove="onMiddleTouchMove"
          @touchend="onMiddleTouchEnd"
        >
          <div class="player__middle--left" :style="middleLStyle">
            <div class="player__cd__wrapper" ref="cdWrapperRef">
              <div class="player__cd" ref="cdRef">
                <img
                  class="image"
                  :class="cdState"
                  ref="imgRef"
                  src="../../assets/images/cover.png"
                />
              </div>
            </div>
            <div class="player__cd__lyric">{{ playingLyric }}</div>
          </div>
          <Scroll class="player__middle--right" :style="middleRStyle" ref="scrollRef">
            <div class="player__lyric__wrapper">
              <div v-if="currentLyric" ref="lyricRef">
                <p
                  class="player__lyric__text"
                  :class="{ 'player__lyric__text--current': currentLineNum === index }"
                  v-for="(line, index) in currentLyric.lines"
                  :key="line.num"
                >{{ line.txt }}</p>
              </div>
            </div>
          </Scroll>

          <div class="player__dot__wrapper">
            <span class="player__dot" :class="{ 'player__dot--active': currentShow === 'cd' }"></span>
            <span class="player__dot" :class="{ 'player__dot--active': currentShow === 'lyric' }"></span>
          </div>
        </div>
        <div class="player__bottom">
          <div class="player__progress__wrapper">
            <span
              class="player__progress__time player__progress__time--left"
            >{{ formatTime(currentTime) }}</span>
            <div class="player__progress__bar">
              <ProgressBar
                ref="barRef"
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
                class="iconfont"
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
    </transition>

    <PlayerMini :progress="progress" :togglePlayHandle="togglePlayHandle" />
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
import { ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import useMode from './use-mode'
import useCd from './use-cd'
import useLyric from './use-lyric'
import useFavorite from './use-favorite'
import usePlay from './use-play'
import useStyle from './use-style'
import { formatTime } from '../../assets/js/util'
import ProgressBar from './progress-bar.vue'
import Scroll from '../base/scroll/scroll.vue'
import PlayerMini from './player-mini.vue'
import useAnimation from './use-animation'
const store = useStore()
// 歌曲是否准备播放 控制歌词和播放,样式
const onReady = ref(false)

// 样式
const { fullScreen, backHandle, iconDisable, currentShow, middleLStyle, middleRStyle, onMiddleTouchStart, onMiddleTouchMove, onMiddleTouchEnd } = useStyle({ onReady })

// 动画
const { cdWrapperRef, enter, afterEnter, leave, afterLeave } = useAnimation()

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
    return currentTime.value * 1000 / currentSong.value.dt
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
    playLyric()
    stopLyric()
  }

  const onProgressChanged = (progress) => {
    progressChanging = false
    audioRef.value.currentTime = currentTime.value = currentSong.value.dt / 1000 * progress
    if (!playing.value) {
      store.commit('setPlayState', true)
      playLyric()
    }
  }

  return { currentTime, progress, updateTime, onProgressChanging, onProgressChanged }
}
const { currentTime, progress, updateTime, onProgressChanging, onProgressChanged } = useProgress()

// 歌词
const { scrollRef, lyricRef, currentLyric, currentLineNum, playingLyric, playLyric, stopLyric } = useLyric({ onReady, currentTime })

// 播放
const {
  audioRef,
  currentSong,
  playing,
  playlist,
  ready,
  error,
  end,
  getMusicData,
  togglePlayHandle,
  pauseHandle,
  prevHandle,
  nextHandle
} = usePlay({ playLyric, onReady, currentTime })

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
  store.commit('setPlayState', true)
})
// 切换播放模式
watch(playing, (newPlaying) => {
  if (!onReady.value) {
    return
  }
  const audioEl = audioRef.value
  if (newPlaying) {
    audioEl.play()
    playLyric()
  } else {
    audioEl.pause()
    stopLyric()
  }
})

const barRef = ref(null)
watch(fullScreen, async (newFullScreen) => {
  if (newFullScreen) {
    await nextTick()
    barRef.value.setOffsets(progress.value)
  }
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
    width: 60%;
    @include no-wrap;
    text-align: center;
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

    &__lyric {
      text-align: center;
      margin: 20px 0;
      height: 20px;
      color: $color-text-d;
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
  }

  &__dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 99999px;
    background-color: $color-theme;
    margin: 0 5px;

    &__wrapper {
      text-align: center;
    }

    &--active {
      width: 25px;
      transition: all 0.3s;
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

.normal-enter-active,
.normal-leave-active {
  transition: all 0.6s;

  .player__top,
  .player__bottom {
    transform: all 0.6s;
  }
}

.normal-enter-from,
.normal-leave-to {
  opacity: 0;

  .player__top {
    transform: translate3d(0, -100px, 0);
  }
  .player__bottom {
    transform: translate3d(0, 100px, 0);
  }
}
</style>
