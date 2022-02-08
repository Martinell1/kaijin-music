import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { ref, onMounted, onUnmounted } from 'vue'
BScroll.use(ObserveDOM)
export default function useScroll (wrapperRef, options) {
  const scroll = ref(null)

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      options,
      observeDOM: true
    })
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })
}
