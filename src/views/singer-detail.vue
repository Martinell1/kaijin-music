<template>
  <div class="singer__detail">
    <MusicList
      :loading="loading"
      :noResult="noResult"
      :songs="singer.songs"
      :title="singer.name"
      :pic="singer.cover"
    ></MusicList>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSingerDetail, getSingerSongs } from '../api/api'
import MusicList from '../components/music-list/music-list.vue'

const useSingerEffect = () => {
  const route = useRoute()
  const id = route.params.id
  const singer = ref({})
  const getSingerData = async () => {
    const { data: { data: result } } = await getSingerDetail(id)
    singer.value.name = result.artist.name
    singer.value.cover = result.artist.cover
  }

  const getSongsDta = async () => {
    const { data: result } = await getSingerSongs(id)
    singer.value.songs = result.songs
  }

  const loading = computed(() => {
    return !singer.value.songs?.length
  })

  const noResult = computed(() => {
    return !loading.value && !singer.value.songs?.length
  })
  return { singer, getSingerData, getSongsDta, loading, noResult }
}
const { singer, getSingerData, getSongsDta, loading, noResult } = useSingerEffect()
getSingerData()
getSongsDta()

</script>
<style lang='scss' scoped>
.singer__detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
