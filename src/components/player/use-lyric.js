import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { getLyric } from '../../api/api'
import Lyric from 'lyric-parser'

export default function useLyric ({ onReady, currentTime }) {
  const currentLyric = ref(null)
  const currentLineNum = ref(0)
  const playingLyric = ref('')

  const scrollRef = ref(null)
  const lyricRef = ref(null)

  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)

  watch(currentSong, async (newSong) => {
    if (!newSong.id) {
      return
    }
    stopLyric()
    currentLyric.value = null
    currentLineNum.value = 0
    const { data: result } = await getLyric(newSong)
    console.log(result)
    const lyric = result.lrc.lyric
    store.commit('addSongLyric', {
      song: newSong,
      lyric
    })
    if (currentSong.value.lyric !== lyric) {
      return
    }
    currentLyric.value = new Lyric(lyric, handleLyric)

    if (onReady.value) {
      playLyric()
    }
  })

  function handleLyric ({ lineNum, txt }) {
    currentLineNum.value = lineNum
    playingLyric.value = txt
    const scrollComp = scrollRef.value
    const lyricEl = lyricRef.value
    if (!lyricEl) {

    }
    if (lineNum > 5) {
      const lineEl = lyricEl.children[lineNum - 5]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }

  function playLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }

  function stopLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }

  return { scrollRef, lyricRef, currentLyric, currentLineNum, playingLyric, playLyric, stopLyric }
}
