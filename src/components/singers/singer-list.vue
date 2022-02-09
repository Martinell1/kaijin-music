<template>
  <Scroll :pullUpLoad="true" class="singer__list">
    <ul>
      <li v-for="singer in singers" :key="singer.id">
        <router-link :to="{ name: 'SingerDetail', params: { id: singer.id } }" class="singer__item">
          <img class="singer__cover" width="50" height="50" v-lazy="singer.picUrl" />
          <span class="singer__title">{{ singer.name }}</span>
        </router-link>
      </li>
    </ul>
  </Scroll>
</template>

<script setup>

import Scroll from '@/components/base/scroll/scroll.vue'
defineProps({
  singers: {
    type: Array,
    default () {
      return []
    }
  }
})

</script>
<style lang='scss' scoped>
.singer {
  &__list {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__item {
    margin: 0 20px 20px 20px;
    display: flex;
    align-items: center;
    color: $color-text;
  }

  &__cover {
    border-radius: 50%;
    margin-right: 20px;
  }
}
</style>
