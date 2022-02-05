<template>
  <div class="tab">
    <router-link class="tab__item" v-for="tab in tabs" :key="tab.path" :to="tab.path">
      <span class="tab__link">{{ tab.name }}</span>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const useTabEffect = () => {
  const tabs = ref([{
    name: '推荐',
    path: '/recommend'
  }, {
    name: '歌手',
    path: '/singer'
  }, {
    name: '排行',
    path: '/top-list'
  }, {
    name: '搜索',
    path: '/search'
  }])
  return { tabs }
}
const { tabs } = useTabEffect()
</script>
<style lang='scss' scoped>
.tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;

  &__item {
    flex: 1;
    text-align: center;

    &.router-link-active {
      .tab__link {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }

  &__link {
    color: $color-text;
    padding-bottom: 5px;
  }
}
</style>
