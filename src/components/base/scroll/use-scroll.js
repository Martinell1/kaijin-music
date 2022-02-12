import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import Pullup from '@better-scroll/pull-up'
import { ref, onMounted, onUnmounted, inject } from 'vue'
BScroll.use(ObserveDOM)
BScroll.use(Pullup)
export default function useScroll (wrapperRef, options, emit) {
  const scroll = ref(null)

  if (options.pullUpLoad) {
    var getSingersData = inject('getSingersData')
  }
  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(wrapperRef.value, {
      click: true,
      observeDOM: true,
      ...options
    })
    if (options.probeType > 0) {
      scrollVal.on('scroll', (pos) => {
        emit('scroll', pos)
      })
    }

    if (options.pullUpLoad) {
      scrollVal.on('pullingUp', async () => {
        await getSingersData()
        scrollVal.finishPullUp()
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  return { scroll }
}
