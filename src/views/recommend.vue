<template>
  <div class="recommand">
    <div class="slider__wrapper">
      <div class="slider__content">
        <Slider v-if="sliders.length" :sliders="sliders" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getBanner } from '@/api/api'
import Slider from '@/components/base/slider/slider.vue'
const useRecommendEffect = () => {
  const sliders = ref([])
  const getBannersData = async () => {
    const { data: result } = await getBanner()
    sliders.value = result.banners
  }
  return { sliders, getBannersData }
}
const { sliders, getBannersData } = useRecommendEffect()
getBannersData()

</script>
<style lang='scss' scoped>
.recommand {
  position: fixed;
  width: 100%;
  left: 0;
  top: 88px;
  bottom: 0;

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
}
</style>
