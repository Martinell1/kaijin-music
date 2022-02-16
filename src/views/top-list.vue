<template>
  <h1>top-list</h1>
</template>

<script setup>
import { getToplist } from '../api/api'
const useTopList = () => {
  const getTopData = async () => {
    const { data: result } = await getToplist()
    console.log(result)
  }

  return { getTopData }
}
const { getTopData } = useTopList()
getTopData()
</script>
<style lang='scss' scoped>
</style>
