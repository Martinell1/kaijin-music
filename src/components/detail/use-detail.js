import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
export default function useDetail (fetchDetailDate, fetchSongsData) {
  const route = useRoute()
  const id = route.params.id
  const data = ref({})

  const getDetailDate = async () => {
    let { data: result } = await fetchDetailDate(id)
    if (result.data) {
      result = result.data
    }
    data.value.name = result.playlist?.name || result.artist.name
    data.value.cover = result.playlist?.coverImgUrl || result.artist.cover
  }

  const getSongsDate = async () => {
    const { data: result } = await fetchSongsData(id)
    data.value.songs = result.songs
  }

  const loading = computed(() => {
    return !data.value.songs?.length
  })

  const noResult = computed(() => {
    return !loading.value && !data.value.songs?.length
  })

  return { data, getDetailDate, getSongsDate, loading, noResult }
}
