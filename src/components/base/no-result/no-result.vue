<template>
  <div class="no-result">
    <div class="no-result__content">
      <div class="icon"></div>
      <p class="no-result__text">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: '暂无数据,请刷新或检查您的网络'
  }
})

const title = ref('')
const setTitle = (titleValue) => {
  title.value = titleValue
}

defineExpose({
  setTitle
})
</script>
<style lang='scss' scoped>
.no-result {
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
