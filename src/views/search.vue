<template>
  <div class="search">
    <div class="search__input__wrapper">
      <searchInput></searchInput>
    </div>
    <div class="search__content" v-show="!query">
      <div class="search__hot-keys">
        <h1 class="search__title">热门搜索</h1>
        <ul>
          <li
            class="search__item"
            v-for="(item, index) in hotkeys"
            :key="index"
            @click="addQuery(item.searchWord)"
          >
            <span>{{ item.searchWord }}</span>
          </li>
        </ul>
      </div>
      <div class="search__history">
        <h1 class="search__title">搜索历史</h1>
        <SearchList :searches="searches"></SearchList>
      </div>
    </div>
    <div class="search__result">
      <Suggest></Suggest>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import searchInput from '../components/search/search-input.vue'
import Suggest from '../components/search/suggest.vue'
import { getSearchHotKeys } from '@/api/api.js'
import SearchList from '../components/search/search-list.vue'
import { useStore } from 'vuex'

const query = ref('')
const suggests = ref([])
provide('query', query)
provide('suggests', suggests)
const hotkeys = ref([])

const getHotKeys = async () => {
  const { data: { data: result } } = await getSearchHotKeys()
  hotkeys.value = result.slice(10)
}

const addQuery = (s) => {
  query.value = s
}
getHotKeys()

// 历史记录
const store = useStore()
const searches = computed(() => store.state.searchHistory)

</script>
<style lang='scss' scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;

  &__input__wrapper {
    margin: 20px;
  }

  &__content {
    margin: 0 20px;
    ul {
      display: flex;
      flex-wrap: wrap;
    }
  }

  &__item {
    border-radius: 6px;
    padding: 6px;
    margin: 0 10px 15px 0;
    background-color: $color-highlight-background;
    color: $color-text-d;
  }

  &__title {
    margin-bottom: 15px;
  }

  &__history {
    margin-top: 20px;
    position: relative;
    height: 280px;
  }

  &__result {
    height: 100%;
    overflow: hidden;
  }
}
</style>
