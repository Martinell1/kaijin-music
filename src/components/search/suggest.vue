<template>
  <div class="suggest" v-loading:[loadingText]="loading" v-no-result="noResult">
    <ul class="suggest__list">
      <li class="suggest__item" v-for="(suggest, index) in suggests" :key="index">
        <div class="suggest__icon">
          <i class="iconfont icon-search"></i>
        </div>
        <div class="suggest__keyword">{{ suggest.keyword }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getSearchSuggest } from '../../api/api'
// eslint-disable-next-line no-undef
const props = defineProps({
  query: String,
  showSinger: {
    type: Boolean,
    default: false
  }
})

const suggests = ref([])
const loading = computed(() => suggests.value?.length === 0 && !!props.query)
const loadingText = ref('正在搜索')
const noResult = computed(() => {
  return suggests.value === {}
})

watch(() => props.query, (newQuery) => {
  if (!newQuery) {
    suggests.value = []
    return
  }
  searchInit()
})

async function searchInit () {
  const { data: { result } } = await getSearchSuggest(props.query)
  suggests.value = result.allMatch
}

</script>
<style lang='scss' scoped>
.suggest {
  height: 100%;
  overflow: hidden;

  &__list {
    padding: 0 30px;
  }

  &__item {
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
