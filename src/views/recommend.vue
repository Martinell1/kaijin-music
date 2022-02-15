<template>
  <div class="recommend" v-loading="loading">
    <Scroll class="recommend__content">
      <div>
        <div class="slider__wrapper">
          <div class="slider__content">
            <Slider v-if="sliders.length" :sliders="sliders" />
          </div>
        </div>
        <div class="recommend__list">
          <h1 class="list__title" v-show="!loading">热门歌单推荐</h1>
          <ul>
            <li v-for="item in playLists" :key="item.id" class="recommend__item">
              <div class="recommend__icon">
                <img width="60" height="60" v-lazy="item.coverImgUrl" />
              </div>
              <div class="recommend__text">
                <h2 class="recommend__name">{{ item.creator.nickname }}</h2>
                <p class="recommend__title">{{ item.name }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getBanners, getPlayLists } from '@/api/api'
import Slider from '@/components/base/slider/slider.vue'
import Scroll from '@/components/wrap-scroll/wrap-scroll'
const useRecommendEffect = () => {
  const sliders = ref([])
  const getBannersData = async () => {
    const { data: result } = await getBanners()
    sliders.value = result.banners
  }
  return { sliders, getBannersData }
}
const { sliders, getBannersData } = useRecommendEffect()
getBannersData()

const usePlayListsEffect = () => {
  const playLists = ref([])
  const getPlayListsData = async () => {
    const { data: result } = await getPlayLists()
    playLists.value = result.playlists
  }
  return { playLists, getPlayListsData }
}

const { playLists, getPlayListsData } = usePlayListsEffect()
getPlayListsData()

const useLoadingEffect = () => {
  const loading = computed(() => {
    return !playLists.value.length && !sliders.value.length
  })

  return { loadingText, loading }
}

const { loadingText, loading } = useLoadingEffect()
</script>
<style lang='scss' scoped>
.recommend {
  position: fixed;
  width: 100%;
  left: 0;
  top: 88px;
  bottom: 0;

  &__content {
    height: 100%;
    overflow: hidden;
  }

  .slider {
    &__wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
    }

    &__content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__list {
    .list__title {
      height: 65px;
      line-height: 65px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-theme;
    }
  }

  &__item {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;
  }

  &__icon {
    flex: 0 0 60px;
    width: 60px;
    padding-right: 20px;
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    font-size: $font-size-medium;
  }

  &__name {
    margin-bottom: 10px;
    color: $color-text;
  }

  &__title {
    color: $color-text-d;
  }
}
</style>
