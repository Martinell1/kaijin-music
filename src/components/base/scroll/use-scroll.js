import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import Pullup from '@better-scroll/pull-up'
import { ref, onMounted, onUnmounted } from 'vue'
BScroll.use(ObserveDOM)
BScroll.use(Pullup)
export default function useScroll (wrapperRef, options) {
  const scroll = ref(null)
  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      pullUpLoad: true
    })
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })
}
