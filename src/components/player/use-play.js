import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { getMusicUrl } from '../../api/api'
import { PLAY_MODE } from '@/assets/js/constance'

export default function usePlay ({ playLyric, onReady, currentTime }) {
  const store = useStore()

  const currentSong = computed(() => store.getters.currentSong)
  const playing = computed(() => store.state.playing)
  const currentIndex = computed(() => store.state.currentIndex)
  const playlist = computed(() => store.state.playlist)
  const playMode = computed(() => store.state.playMode)

  const audioRef = ref(null)

  const getMusicData = async (id) => {
    const { data: result } = await getMusicUrl(id)

    return result.data[0].url
  }

  const togglePlayHandle = () => {
    store.commit('setPlayState', !playing.value)
  }

  const pauseHandle = () => {
    store.commit('setPlayState', false)
  }

  const ready = () => {
    if (onReady.value) {
      return
    }
    onReady.value = true
    playLyric()
  }

  const error = () => {
    onReady.value = true
  }

  const end = () => {
    currentTime.value = 0
    if (playMode.value === PLAY_MODE.loop) {
      loop()
    } else {
      nextHandle()
    }
  }

  const shiftMusic = (ShiftHandle) => {
    const list = playlist.value
    if (!onReady.value || !list) {
    } else if (list.length === 1) {
      loop()
    } else {
      const index = ShiftHandle()

      store.commit('setCurrentIndex', index)
    }
  }

  const prevHandle = () => {
    shiftMusic(() => {
      let index = currentIndex.value - 1
      if (index === -1) {
        index = playlist.value.length - 1
      }
      return index
    })
  }

  const nextHandle = () => {
    shiftMusic(() => {
      let index = currentIndex.value + 1
      if (index === playlist.value.length) {
        index = 0
      }
      return index
    })
  }

  const loop = () => {
    const audioEl = audioRef.value
    audioEl.currentTime = 0
    audioEl.play()
    store.commit('setPlayState', true)
  }

  return {
    audioRef,
    currentSong,
    playing,
    playlist,
    onReady,
    ready,
    error,
    end,
    getMusicData,
    togglePlayHandle,
    pauseHandle,
    prevHandle,
    nextHandle
  }
}
