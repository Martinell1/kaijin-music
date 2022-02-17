<template>
  <Scroll class="search__list">
    <transition-group name="list" tag="ul">
      <li v-for="item in searches" :key="item" class="search__item" @click="selectHandle(item)">
        <span class="search__text">{{ item }}</span>
        <span class="iconfont icon-delete" v-if="canDelete" @click.stop="deleteHistoryHandle(item)"></span>
      </li>
    </transition-group>
  </Scroll>
</template>

<script setup>
import { inject } from 'vue'
import Scroll from '../base/scroll/scroll.vue'
import useSearchHistory from './use-searchHistory'
// eslint-disable-next-line no-undef
defineProps({
  searches: Array,
  canDelete: {
    type: Boolean,
    default: true
  }
})
const query = inject('query')
const selectHandle = (item) => {
  query.value = item
}

const { deteleSearch } = useSearchHistory()
const deleteHistoryHandle = (item) => {
  deteleSearch(item)
}
</script>
<style lang='scss' scoped>
.search {
  &__list {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__item {
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;
    justify-content: space-between;
  }

  &__text {
    @include no-wrap();
  }

  .iconfont {
    font-size: $font-size-small;
  }
}
</style>
