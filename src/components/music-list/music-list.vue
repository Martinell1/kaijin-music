<template>
  <div class="music__list">
    <div class="music__header">
      <div class="music__back">
        <i class="iconfont icon-back" @click="backHandle"></i>
      </div>
      <h1 class="music__title">{{ title }}</h1>
      <div class="music__play" :style="btnPlayStyle" @click="randomPlay">
        <div class="music__play__btn" v-show="!loading">
          <i class="iconfont icon-play"></i>
          <div class="music__play__text">随机播放全部歌曲</div>
        </div>
      </div>
    </div>

    <div class="music__bg__image" :style="bgImageStyle" ref="bgImageRef">
      <div class="music__bg__filter" :style="filterStyle"></div>
    </div>
    <scroll
      v-loading="loading"
      v-no-result="noResult"
      :probeType="3"
      @scroll="onScroll"
      class="music__songs"
      :style="scrollStyle"
    >
      <SongList :songList="songs" @select="selectItem"></SongList>
    </scroll>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import scroll from '../base/scroll/scroll.vue'
import SongList from '../base/song-list.vue/song-list.vue'
const props = defineProps({
  songs: {
    type: Array,
    default () {
      return []
    }
  },
  title: {
    type: String,
    default: ''
  },
  pic: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: true
  },
  noResult: {
    type: Boolean,
    default: false
  }
})
const HEADER_HEIGHT = 40
const useStyle = () => {
  const scrollY = ref(0)
  const bgImageRef = ref(null)
  const bgImageHeight = ref(300)
  const maxTranslateY = ref(0)

  const onScroll = (pos) => {
    scrollY.value = -pos.y
  }

  const bgImageStyle = computed(() => {
    let zIndex = 0
    let paddingTop = '70%'
    let height = 0

    let scale = 1

    if (scrollY.value > maxTranslateY.value) {
      zIndex = 10
      paddingTop = '0'
      height = HEADER_HEIGHT + 'px'
    }

    if (scrollY.value < 0) {
      scale = 1 + Math.abs(scrollY.value / bgImageHeight.value)
    }

    return {
      zIndex,
      paddingTop,
      height,
      backgroundImage: `url(${props.pic})`,
      transform: `scale(${scale})`
    }
  })

  const scrollStyle = computed(() => {
    return {
      top: `${bgImageHeight.value}px`
    }
  })

  const filterStyle = computed(() => {
    let blur = 0
    if (scrollY.value >= 0) {
      blur = Math.min(maxTranslateY.value / bgImageHeight.value, scrollY.value / bgImageHeight.value) * 20
    }
    return {
      backdropFilter: `blur(${blur}px)`
    }
  })

  const btnPlayStyle = computed(() => {
    let display = ''
    if (scrollY.value >= HEADER_HEIGHT) {
      display = 'none'
    }
    return {
      display
    }
  })

  return { scrollStyle, bgImageStyle, filterStyle, btnPlayStyle, bgImageRef, bgImageHeight, maxTranslateY, onScroll }
}

const { scrollStyle, bgImageStyle, filterStyle, bgImageRef, btnPlayStyle, bgImageHeight, maxTranslateY, onScroll } = useStyle()

onMounted(() => {
  bgImageHeight.value = bgImageRef.value.clientHeight
  maxTranslateY.value = bgImageHeight.value - HEADER_HEIGHT
})
const router = useRouter()
const backHandle = () => {
  router.go(-1)
}

const usePlayEffect = () => {
  const store = useStore()
  const selectItem = (song, index) => {
    store.dispatch('selectPlay', {
      list: props.songs,
      index
    })
  }

  const randomPlay = () => {
    store.dispatch('randomPlay', {
      list: props.songs
    })
  }

  return { selectItem, randomPlay }
}

const { selectItem, randomPlay } = usePlayEffect()

</script>
<style lang='scss' scoped>
.music {
  &__list {
    position: relative;
    height: 100%;
    background: $color-background;
  }

  &__header {
    color: $color-theme;
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    z-index: 20;
    top: 20px;
    font-size: $font-size-large;
  }

  &__back {
    position: absolute;
    left: 10px;
  }

  &__title {
    position: absolute;
    width: 60%;
    @include no-wrap;
    text-align: center;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }

  &__play {
    position: absolute;
    left: 50%;
    top: 160px;
    font-size: $font-size-small;
    transform: translate3d(-50%, 0, 0);

    &__btn {
      display: flex;
      align-items: center;
      padding: 8px;
      border: 2px solid $color-theme;
      border-radius: 10px;
    }

    &__text {
      margin-left: 8px;
    }
  }

  &__bg {
    &__image {
      position: relative;
      width: 100%;
      transform-origin: top;
      background-size: cover;
    }

    &__filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__songs {
    position: absolute;
    width: 100%;
    z-index: 0;
    bottom: 0;
  }
}
</style>
