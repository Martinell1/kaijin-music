<template>
  <div>
    <Scroll class="top-list" v-loading="loading">
      <div class="top-list__content">
        <ul>
          <li v-for="item in toplistOffical" :key="item.id">
            <router-link
              :to="{ name: 'TopListDetail', params: { id: item.id } }"
              class="top-list__offical__item"
            >
              <div class="top-list__icon">
                <img width="100" height="100" v-lazy="item.coverImgUrl" />
              </div>
              <ul class="top-list__offical__songs">
                <li
                  v-for="(song, index) in item.tracks"
                  :key="song.id"
                  class="top-list__offical__song"
                >
                  <span class="top-list__offical__index">{{ index }}.</span>
                  <span class="top-list__offical__name">{{ song.first }}</span>
                  <span class="top-list__offical__singer">{{ song.second }}</span>
                </li>
              </ul>
            </router-link>
          </li>
        </ul>

        <div class="top-list__others">
          <div v-for="item in  toplistOthers" :key="item.id" class="top-list__others__item">
            <router-link :to="{ name: 'TopListDetail', params: { id: item.id } }">
              <div>
                <img width="100" height="100" v-lazy="item.coverImgUrl" />
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </Scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getToplist } from '../api/api'
import Scroll from '../components/base/scroll/scroll.vue'
const useTopList = () => {
  const toplist = ref([])
  const toplistOffical = ref([])
  const toplistOthers = ref([])
  const loading = computed(() => !toplist.value.length)

  const getTopData = async () => {
    const { data: result } = await getToplist()
    toplist.value = result.list
    toplistOffical.value = toplist.value.slice(0, 4)
    toplistOthers.value = toplist.value.slice(4)
  }

  return { toplistOffical, toplistOthers, loading, getTopData }
}
const { toplistOffical, toplistOthers, loading, getTopData } = useTopList()
getTopData()
</script>
<style lang='scss' scoped>
.top-list {
  position: fixed;
  top: 88px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;

  &__content {
    padding: 0 20px;
  }

  &__offical {
    &__item {
      display: flex;
      height: 100px;
      margin-bottom: 20px;
      &:nth-child(odd) {
        background-color: $color-background-d;
      }
    }

    &__icon {
      flex: 0 0 100px;
      width: 100px;
      height: 100px;
    }

    &__songs {
      flex: 1;
      display: flex;
      padding: 20px;
      overflow: hidden;
      flex-direction: column;
      justify-content: space-between;
    }

    &__song {
      @include no-wrap();
    }

    &__index {
      margin-right: 10px;
    }
  }

  &__others {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &__item {
      margin: 10px 0;
    }
  }
}
</style>
