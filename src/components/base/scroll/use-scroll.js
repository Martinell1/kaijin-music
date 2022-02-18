import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import Pullup from '@better-scroll/pull-up'
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'
BScroll.use(ObserveDOM)
BScroll.use(Pullup)
export default function useScroll (wrapperRef, options, emit, pullUpLoadFn) {
  const scroll = ref(null)

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
        await pullUpLoadFn()
        scrollVal.finishPullUp()
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
  })

  onDeactivated(() => {
    scroll.value.disable()
  })

  return { scroll }
}
