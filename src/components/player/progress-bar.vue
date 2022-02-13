<template>
  <div class="progress-bar" @click="onClickHnadle" ref="rootRef">
    <div class="bar-inner">
      <div class="progress" ref="progressRef" :style="progressStyle"></div>
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
const props = defineProps({
  progress: {
    type: Number,
    default: 0
  }
})
const offset = ref(0)

const progressBtnWidth = 16

const useStyle = () => {
  const progressStyle = computed(() => {
    return `width:${offset.value}px`
  })

  const btnStyle = computed(() => {
    return `transform:translate3d(${offset.value}px,0,0)`
  })

  return { progressStyle, btnStyle }
}
const { progressStyle, btnStyle } = useStyle()
const progressRef = ref(null)
const usePull = () => {
  const touchEl = {}

  const onTouchStart = (e) => {
    touchEl.x1 = e.touches[0].pageX
    touchEl.beginWidth = progressRef.value.clientWidth
  }

  const onTouchMove = (e) => {
    const dalta = e.touches[0].pageX - touchEl.x1
    const t = touchEl.beginWidth + dalta
    const barWidth = rootRef.value.clientWidth - progressBtnWidth
    const progress = Math.min(1, Math.max(t / barWidth, 0))
    offset.value = barWidth * progress
    emit('progress-changing', progress)
  }

  const onTouchEnd = (e) => {
    const barWidth = rootRef.value.clientWidth - progressBtnWidth
    const progress = progressRef.value.clientWidth / barWidth
    emit('progress-changed', progress)
  }

  const onClickHnadle = (e) => {
    const rect = rootRef.value.getBoundingClientRect()
    const offsetWidth = e.pageX - rect.left
    const barWidth = rootRef.value.clientWidth - progressBtnWidth
    const progress = offsetWidth / barWidth
    emit('progress-changed', progress)
  }

  return { onTouchStart, onTouchMove, onTouchEnd, onClickHnadle, setOffsets }
}
const emit = defineEmits(['progress-changing', 'progress-changed'])

const { onTouchStart, onTouchMove, onTouchEnd, onClickHnadle } = usePull()

// 进度
const rootRef = ref(null)
const setOffsets = (progress) => {
  const barWidth = rootRef.value.clientWidth - progressBtnWidth
  offset.value = barWidth * progress
}
watch(() => props.progress, (newProgress) => {
  setOffsets(newProgress)
})
defineExpose({
  setOffsets
})
</script>
<style lang='scss' scoped>
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background-color: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background-color: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background-color: $color-theme;
      }
    }
  }
}
</style>
