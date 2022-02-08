<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useScroll from './use-scroll'
const props = defineProps({
  click: {
    type: Boolean,
    default: true
  }
})
const rootRef = ref(null)
useScroll(rootRef, props)
</script>
<style lang='scss' scoped>
</style>
