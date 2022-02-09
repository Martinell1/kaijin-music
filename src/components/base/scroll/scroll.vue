<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useScroll from './use-scroll'
const props = defineProps({
  pullUp: {
    type: Boolean,
    default: false
  }
})
const rootRef = ref(null)
useScroll(rootRef, props.pullUp)

</script>
<style lang='scss' scoped>
</style>
