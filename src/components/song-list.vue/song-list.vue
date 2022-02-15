<template>
  <div class="song__list">
    <ul>
      <li
        class="song__item"
        v-for="(song, index) in songList"
        :key="song.id"
        @click="() => selectItem(song, index)"
      >
        <div class="song__name">{{ song.name }}</div>
        <div class="song__desc">
          {{ song.ar[0].name }}
          <span>-</span>
          {{ song.al.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  songList: {
    type: Array,
    default () {
      return []
    }
  }
})
// eslint-disable-next-line no-undef
const emit = defineEmits(['select'])
const selectItem = async (song, index) => {
  emit('select', song, index)
  // const { data: result } = await checkMusicAble(song.id)
  // if (result.success) {
  //   emit('select', song, index)
  // } else {
  //   alert(result.message)
  // }
}
</script>
<style lang='scss' scoped>
.song {
  &__list {
    padding: 20px;
    background: $color-background;
  }

  &__item {
    margin-bottom: 20px;
  }

  &__desc {
    color: $color-text-d;
  }
}
</style>
