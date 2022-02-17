<template>
  <Scroll
    :pullUpLoad="true"
    :pullUpLoadFn="getSearchResult"
    class="suggest"
    v-loading:[loadingText]="loading"
    v-no-result="noResult"
  >
    <ul class="suggest__list">
      <li
        class="suggest__item"
        v-for="(suggest, index) in suggests"
        :key="index"
        @click="suggestHandle(suggest)"
      >
        <div class="suggest__icon">
          <i class="iconfont icon-search"></i>
        </div>
        <div class="suggest__keyword">{{ suggest.name }}--{{ suggest.ar?.[0].name }}</div>
      </li>
    </ul>
  </Scroll>
</template>

<script setup>
import { ref, computed, watch, inject } from 'vue'
import { useStore } from 'vuex'
import { doSearch } from '../../api/api'
import Scroll from '../base/scroll/scroll.vue'
// eslint-disable-next-line no-undef
defineProps({
  showSinger: {
    type: Boolean,
    default: false
  },
  pullUpLoadFn: {
    type: Function,
    default () {
    }
  }
})

const query = inject('query')
const suggests = inject('suggests')
const store = useStore()
const page = ref(0)

const loading = computed(() => suggests.value?.length === 0 && !!query.value)
const loadingText = ref('正在搜索')
const noResult = computed(() => {
  return suggests.value === {}
})

const getSearchResult = async () => {
  const { data: { result } } = await doSearch(query.value, page.value++)
  if (query.value) {
    suggests.value = [...suggests.value, ...result.songs]
  }
}

const suggestHandle = (suggest) => {
  store.dispatch('addSong', suggest)
}

watch(query, (newQuery) => {
  suggests.value = []
  page.value = 0
  if (newQuery) {
    getSearchResult()
  }
})

</script>
<style lang='scss' scoped>
.suggest {
  height: 100%;
  &__list {
    padding: 0 30px;
  }

  &__item {
    @include no-wrap();
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    color: $color-text-d;
  }

  &__keyword {
    margin-left: 5px;
  }
}
</style>
