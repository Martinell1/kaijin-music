<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useScroll from './use-scroll'
// eslint-disable-next-line no-undef
const props = defineProps({
  pullUpLoad: {
    type: Boolean,
    default: false
  },
  probeType: {
    type: Number,
    default: 0
  },
  pullUpLoadFn: {
    type: Function,
    default () {

    }
  }
})
// eslint-disable-next-line no-undef
const emit = defineEmits(['scroll'])
const rootRef = ref(null)
const { scroll } = useScroll(rootRef, props, emit, props.pullUpLoadFn)
// eslint-disable-next-line no-undef
defineExpose({
  scroll
})
</script>
<style lang='scss' scoped>
</style>
