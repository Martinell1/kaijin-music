import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default function useStyle ({ onReady }) {
  const store = useStore()

  const fullScreen = computed(() => store.state.fullScreen)

  const backHandle = () => {
    store.commit('setFullScreen', false)
  }

  const iconDisable = computed(() => {
    return onReady.value ? '' : 'player__oper__icon--disable'
  })

  // cd封面和歌词的切换
  const currentShow = ref('cd')
  const middleLStyle = ref(null)
  const middleRStyle = ref(null)

  var touch = {}
  let currentView = 'cd'

  const onMiddleTouchStart = (e) => {
    touch.startX = e.touches[0].pageX
    touch.startY = e.touches[0].pageY
    touch.directionLocked = ''
  }

  const onMiddleTouchMove = (e) => {
    const deltaX = e.touches[0].pageX - touch.startX
    const deltaY = e.touches[0].pageY - touch.startY
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    if (!touch.directionLocked) {
      touch.directionLocked = absDeltaX >= absDeltaY ? 'h' : 'v'
    }
    if (touch.directionLocked === 'v') {
      return
    }

    const left = currentView === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
    touch.percent = Math.abs(offsetWidth / window.innerWidth)
    if (currentView === 'cd') {
      if (touch.percent > 0.2) {
        currentShow.value = 'lyric'
      }
    } else {
      if (touch.percent < 0.8) {
        currentShow.value = 'cd'
      }
    }

    middleLStyle.value = {
      opacity: 1 - touch.percent,
      transitionDuration: '0ms'
    }

    middleRStyle.value = {
      Transform: `translate3d(${offsetWidth}px,0,0)`,
      transitionDuration: '0ms'
    }
  }

  const onMiddleTouchEnd = (e) => {
    let offsetWidth
    let opacity
    if (currentShow.value === 'cd') {
      currentView = 'cd'
      offsetWidth = 0
      opacity = 1
    } else {
      currentView = 'lyric'
      offsetWidth = -window.innerWidth
      opacity = 0
    }

    const duration = 300
    middleLStyle.value = {
      opacity: opacity,
      transitionDuration: `${duration}ms`
    }

    middleRStyle.value = {
      Transform: `translate3d(${offsetWidth}px,0,0)`,
      transitionDuration: `${duration}ms`
    }
  }

  return { fullScreen, backHandle, iconDisable, currentShow, middleLStyle, middleRStyle, onMiddleTouchStart, onMiddleTouchMove, onMiddleTouchEnd }
}
