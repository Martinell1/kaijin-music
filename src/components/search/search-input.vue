<template>
  <div class="search-input">
    <i class="iconfont icon-search"></i>
    <input class="input-inner" v-model="query" :placeholder="placeHolder" />
    <i class="iconfont icon-delete" v-show="query" @click="clearHandle"></i>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { debounce } from 'throttle-debounce'
// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: String,
  placeHolder: {
    type: String,
    default: '搜索歌曲、歌手'
  }
})
const query = ref(props.modelValue)

watch(() => props.modelValue, debounce(300, (newProps) => {
  query.value = newProps
}))

// eslint-disable-next-line no-undef
const emits = defineEmits(['update:modelValue'])
watch(query, (newQuery) => {
  emits('update:modelValue', newQuery)
})

const clearHandle = () => {
  query.value = ''
}
</script>
<style lang='scss' scoped>
.search-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  height: 32px;
  background: $color-highlight-background;
  border-radius: 10px;
  .icon-search {
    color: $color-text-d;
  }
  .input-inner {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background-color: $color-highlight-background;
    font-size: $font-size-medium;
    outline: 0;
    border: none;
    color: $color-text;

    &::placeholder {
      color: $color-text-d;
    }
  }

  .icon-delete {
    font-size: $font-size-medium;
    color: $color-text-d;
  }
}
</style>
