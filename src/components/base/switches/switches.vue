<template>
  <ul class="switches">
    <li
      class="switches__item"
      v-for="(item, index) in items"
      :key="item"
      :class="{ 'active': type === index }"
      @click="switchItem(index)"
    >
      <span>{{ item }}</span>
    </li>
  </ul>
</template>

<script setup>
import { inject } from 'vue'
// eslint-disable-next-line no-undef
defineProps({
  items: {
    type: Array,
    default () {
      return []
    }
  }
})
const type = inject('type')

const switchItem = (index) => {
  type.value = index
}
</script>
<style lang='scss' scoped>
.switches {
  display: flex;
  position: relative;
  align-items: center;
  width: 240px;
  margin: 0 auto;

  &__item {
    position: relative;
    z-index: 10;
    flex: 1;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-text-d;

    &.active {
      color: $color-text;
      background: $color-highlight-background;
    }
  }
}
</style>
