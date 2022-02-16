<template>
  <div class="search">
    <div class="search__input__wrapper">
      <searchInput v-model="query"></searchInput>
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
    </div>
    <div class="search__result">
      <Suggest :query="query"></Suggest>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import searchInput from '../components/search/search-input.vue'
import Suggest from '../components/search/suggest.vue'
import { getSearchHotKeys } from '@/api/api.js'
const query = ref('')
const hotkeys = ref([])

const getHotKeys = async () => {
  const { data: { data: result } } = await getSearchHotKeys()
  hotkeys.value = result.slice(10)
}

const addQuery = (s) => {
  query.value = s
}
getHotKeys()
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
    margin: 15px 10px 0 0;
    background-color: $color-highlight-background;
    color: $color-text-d;
  }
}
</style>
