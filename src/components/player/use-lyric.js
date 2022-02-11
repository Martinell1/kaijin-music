import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { getLyric } from '../../api/api'
import Lyric from 'lyric-parser'

export default function useLyric ({ onReady, currentTime }) {
  const currentLyric = ref(null)
  const currentLineNum = ref(0)

  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)

  watch(currentSong, async (newSong) => {
    if (!newSong.id) {
      return
    }
    const { data: result } = await getLyric(newSong)
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

  function handleLyric ({ lineNum }) {
    currentLineNum.value = lineNum
  }

  function playLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
      console.log('currentTime.value * 1000', currentTime.value * 1000)
      console.log('  currentLyricVal.seek(currentTime.value * 1000)', currentLyricVal.seek(currentTime.value * 1000))
    }
  }

  return { currentLyric, currentLineNum, playLyric }
}
