import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default function () {
  const store = useStore()
  const playing = computed(() => store.state.playing)

  const cdRef = ref(null)
  const imgRef = ref(null)

  const cdState = computed(() => {
    return playing.value ? 'player__cd--playing' : ''
  })

  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value, imgRef.value)
    }
  })

  function syncTransform (wrapper, inner) {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : innerTransform.concat('', wrapperTransform)
  }

  return { cdState, cdRef, imgRef }
}
