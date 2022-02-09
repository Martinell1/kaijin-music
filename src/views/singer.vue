<template>
  <div class="singers">
    <SingerFilter />
    <SingerList :singers="singers"></SingerList>
  </div>
</template>

<script setup>
import { ref, reactive, provide } from 'vue'
import { getSingers } from '../api/api'
import SingerList from '../components/singers/singer-list.vue'
import SingerFilter from '../components/singers/singer-filter.vue'
const useSingersEffect = () => {
  const singers = ref([])

  let page = 0
  const params = reactive({
    type: -1,
    area: -1
  })

  const getSingersData = async () => {
    const { data: result } = await getSingers(page++, params.type, params.area)
    singers.value = [...singers.value, ...result.artists]
  }

  const initSingers = () => {
    params.page = 0
    singers.value = []
    getSingersData()
  }

  const changeParams = (key, value) => {
    params[key] = value
    initSingers()
  }

  return { singers, params, changeParams, getSingersData }
}
const { singers, params, changeParams, getSingersData } = useSingersEffect()
getSingersData()
provide('getSingersData', getSingersData)
provide('singersParams', params)
provide('changeParams', changeParams)
</script>
<style lang='scss' scoped>
.singers {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
