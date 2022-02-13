<template>
  <transition name="mini">
    <div class="player__mini" v-show="!fullScreen" @click="nimiPlayerHandle">
      <div class="player__cd__wrapper">
        <div class="player__cd" ref="cdRef">
          <img
            width="40"
            height="40"
            src="../../assets/images/cover.png"
            :class="cdState"
            ref="imgRef"
          />
        </div>
      </div>
      <div class="player__slider" ref="sliderRef">
        <div class="player__slider__group">
          <div class="player__slider__page" v-for="song in playlist" :key="song.id">
            <h2 class="player__name">{{ song.name }}</h2>
            <p class="player__singer" v-if="song.ar">{{ song.ar[0].name }}</p>
          </div>
        </div>
      </div>
      <div class="player__controller">
        <ProgressCircle :radius="32" :progress="progress">
          <i
            class="iconfont player__controller__icon"
            :class="{ 'icon-play': !playing, 'icon-pause': playing }"
            @click.stop="togglePlayHandle"
          ></i>
        </ProgressCircle>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import useCd from './use-cd'
import ProgressCircle from './progress-circle.vue'
import useMiniSlider from './use-mini-slider'
defineProps({
  progress: {
    type: Number,
    default: 0
  },
  togglePlayHandle: {
    type: Function
  }
})

const store = useStore()
const fullScreen = computed(() => store.state.fullScreen)

const playing = computed(() => store.state.playing)
const playlist = computed(() => store.state.playlist)

const { cdState, cdRef, imgRef } = useCd()

const { sliderRef } = useMiniSlider()

const nimiPlayerHandle = () => {
  store.commit('setFullScreen', true)
}
</script>
<style lang='scss' scoped>
.player {
  &__mini {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background-color: $color-highlight-background;
  }

  &__cd {
    height: 100%;
    width: 100%;

    img {
      border-radius: 50%;
    }

    &--playing {
      animation: rotate 10s linear infinite;
    }

    &__wrapper {
      flex: 0 0 40px;
      width: 40px;
      height: 40px;
      padding: 0 10px 0 20px;
    }
  }

  &__slider {
    width: 40%;
    height: 100%;
    overflow: hidden;

    &__group {
      overflow: hidden;
      white-space: nowrap;
      height: 100%;
    }

    &__page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      margin: 12px 0;
    }
  }

  &__name {
    margin-bottom: 5px;
    width: 100%;
    @include no-wrap();
    font-size: $font-size-medium;
    color: $color-theme;
    overflow: hidden;
  }

  &__singer {
    width: 100%;
    @include no-wrap();
    font-size: $font-size-small;
    color: $color-theme-d;
  }

  &__controller {
    position: absolute;
    right: 20px;

    &__icon {
      font-size: 32px;
      position: absolute;
      left: 0;
      transform: scale(0.8);
      color: $color-theme;
    }
  }
}

.mini-enter-active,
.mini-leave-active {
  transition: all 0.6s cubic-bezier(0.455, 0, 0, 1);
}

.mini-enter-from,
.mini-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
</style>
