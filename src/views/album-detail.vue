<template>
  <div class="album__detail">
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
import { getAlbumDetail, getAlbumSongs } from '../api/api'
import MusicList from '../components/music-list/music-list.vue'

const { data, getDetailDate, getSongsDate, loading, noResult } = useDetail(getAlbumDetail, getAlbumSongs)
getDetailDate()
getSongsDate()
</script>
<style lang='scss' scoped>
.album__detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
