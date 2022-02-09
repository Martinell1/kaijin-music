import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import Pullup from '@better-scroll/pull-up'
import { ref, onMounted, onUnmounted, inject } from 'vue'
BScroll.use(ObserveDOM)
BScroll.use(Pullup)
export default function usePull (wrapperRef, options) {
  const scroll = ref(null)
  if (options) {
    var getSingersData = inject('getSingersData')
  }
  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      click: true,
      observeDOM: true,
      pullUpLoad: true
    })

    if (options) {
      scroll.value.on('pullingUp', async () => {
        await getSingersData()
        scroll.value.finishPullUp()
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })
}
