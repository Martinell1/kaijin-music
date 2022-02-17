<template>
  <div class="song__list">
    <ul>
      <li
        class="song__item"
        v-for="(song, index) in songList"
        :key="song.id"
        @click="() => selectItem(song, index)"
      >
        <div v-if="rank" class="song__rank" :class="rankClass(index)">{{ handleRank(index) }}</div>
        <div class="song__text">
          <div class="song__name">{{ song.name }}</div>
          <div class="song__desc">
            {{ song.ar[0].name }}
            <span>-</span>
            {{ song.al.name }}
          </div>
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
  },
  rank: {
    type: Boolean,
    default: false
  }
})
// eslint-disable-next-line no-undef
const emit = defineEmits(['select'])
const selectItem = async (song, index) => {
  emit('select', { song, index })
  // const { data: result } = await checkMusicAble(song.id)
  // if (result.success) {
  //   emit('select', song, index)
  // } else {
  //   alert(result.message)
  // }
}

const rankClass = (index) => {
  if (index <= 2) {
    return `iconfont icon-${index}`
  }
}

const handleRank = (rank) => {
  if (rank > 2) {
    return ++rank
  }
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
    display: flex;
    align-items: center;
  }

  &__rank {
    margin-right: 20px;
    color: $color-theme;

    &.iconfont {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 10px;
      background-size: 20px 20px;
    }

    &.icon-0 {
      @include bg-image("first");
    }
    &.icon-1 {
      @include bg-image("second");
    }

    &.icon-2 {
      @include bg-image("third");
    }
  }

  &__desc {
    color: $color-text-d;
  }
}
</style>
