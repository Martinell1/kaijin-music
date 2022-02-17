<template>
  <div class="slider" ref="rootRef">
    <div class="slider__group">
      <div class="slider__page" v-for="item in sliders" :key="item.id">
        <a :href="item.link">
          <img :src="item.pic" />
        </a>
      </div>
    </div>
    <div class="dots__wrapper">
      <span
        class="dot"
        v-for="(item, index) in sliders"
        :key="item.id"
        :class="{ 'dot--active': currentPageIndex === index }"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useSlider from './use-slider'
// eslint-disable-next-line no-undef
defineProps({
  sliders: {
    type: Array,
    require: true,
    default () {
      return []
    }
  }
})
const rootRef = ref(null)
const { currentPageIndex } = useSlider(rootRef)
</script>
<style lang='scss' scoped>
.slider {
  font-size: 0;
  min-height: 1px;
  touch-action: pan-y;

  &__group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }

  &__page {
    display: inline-block;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;

    a,
    img {
      display: block;
      width: 100%;
    }
  }

  .dots__wrapper {
    position: absolute;
    left: 50%;
    bottom: 12px;
    line-height: 12px;
    transform: translate(-50%, 0);
  }

  .dot {
    display: inline-block;
    content: "";
    width: 6px;
    height: 6px;
    background-color: $color-text;
    border-radius: 50%;
    margin: 0 2px;
    transition: background-color 0.2s;

    &--active {
      background-color: $color-sub-theme;
    }
  }
}
</style>
