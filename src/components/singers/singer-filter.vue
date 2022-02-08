<template>
  <div class="singer__filter">
    <ul class="tag__list">
      <li
        class="tag__item"
        v-for="area in areaList"
        :key="area.id"
        :class="{ 'tag__item--active': area.id === singersParams.area }"
        @click="() => handleAreaItem(area)"
      >{{ area.name }}</li>
    </ul>
    <ul class="tag__list">
      <li
        class="tag__item"
        :class="{ 'tag__item--active': item.id === singersParams.type }"
        v-for="item in typeList"
        :key="item.id"
        @click="() => handleTypetem(item)"
      >{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const singersParams = inject('singersParams')
const changeParams = inject('changeParams')
const useFilterEffect = () => {
  const typeList = [{
    id: 1,
    name: '男'
  }, {
    id: 2,
    name: '女'
  }, {
    id: 3,
    name: '组合/乐队'
  }]

  const areaList = [{
    id: 7,
    name: '华语'
  }, {
    id: 96,
    name: '欧美'
  }, {
    id: 8,
    name: '日本'
  }, {
    id: 16,
    name: '韩国'
  }, {
    id: 0,
    name: '其他'
  }]

  const handleAreaItem = (area) => {
    changeParams('area', area.id)
  }

  const handleTypetem = (item) => {
    changeParams('type', item.id)
  }

  return { typeList, areaList, handleAreaItem, handleTypetem }
}

const { typeList, areaList, handleAreaItem, handleTypetem } = useFilterEffect()
</script>
<style lang='scss' scoped>
.tag {
  &__list {
    display: flex;
    margin: 20px 0;
    width: 100%;
  }

  &__item {
    text-align: center;
    width: 20%;

    &--active {
      color: $color-theme;
    }
  }
}
</style>
