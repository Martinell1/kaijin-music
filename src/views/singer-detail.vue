<template>
  <div class="singer__detail">
    <MusicList
      :loading="loading"
      :noResult="noResult"
      :songs="data.songs"
      :title="data.name"
      :pic="data.cover"
    ></MusicList>
  </div>
</template>

<script setup>
import useDetail from '@/components/detail/use-detail.js'
import { getSingerDetail, getSingerSongs } from '../api/api'
import MusicList from '../components/music-list/music-list.vue'

const { data, getDetailDate, getSongsDate, loading, noResult } = useDetail(getSingerDetail, getSingerSongs)
getDetailDate()
getSongsDate()

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
