<template>
  <div class="loading">
    <div class="loading__content">
      <img width="60" height="60" src="./loading.gif" />
      <p class="loading__desc">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// eslint-disable-next-line no-undef
defineProps({
  title: {
    type: String,
    default: '正在加载数据'
  }
})

const title = ref('')
const setTitle = (titleValue) => {
  title.value = titleValue
}
// eslint-disable-next-line no-undef
defineExpose({
  setTitle
})
</script>
<style lang='scss' scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  &__content {
    text-align: center;
  }

  &__desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
  }
}
</style>
