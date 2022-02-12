<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useScroll from './use-scroll'
const props = defineProps({
  pullUpLoad: {
    type: Boolean,
    default: false
  },
  probeType: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['scroll'])
const rootRef = ref(null)
const { scroll } = useScroll(rootRef, props, emit)
defineExpose({
  scroll
})
</script>
<style lang='scss' scoped>
</style>
