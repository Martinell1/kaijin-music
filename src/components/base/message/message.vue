<template>
  <teleport to="body">
    <transition name="slide-down">
      <div class="message" v-show="visible" @click="closeHandle">
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
// eslint-disable-next-line no-undef
const props = defineProps({
  delay: {
    type: Number,
    default: 0
  }
})
const visible = ref(false)
const timer = ref(null)
const show = () => {
  visible.value = true
  timer.value = setTimeout(() => {
    hide()
  }, props.delay)
}

const hide = () => {
  clearTimeout(timer)
  visible.value = false
}

const closeHandle = () => {
  hide()
}

// eslint-disable-next-line no-undef
defineExpose({
  show
})

</script>
<style lang='scss' scoped>
.message {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 400;
  background: $color-dialog-background;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translate3d(0, -100%, 0);
}
</style>
