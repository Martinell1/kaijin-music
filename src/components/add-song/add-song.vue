<template>
  <teleport to="body">
    <transition name="slide">
      <div class="add-song" v-show="visible">
        <div class="add-song__header">
          <h1 class="add-song__title">添加歌曲列表</h1>
          <div class="add-song__close" @click="hideHandle">
            <i class="iconfont icon-delete"></i>
          </div>
        </div>
        <div class="add-song__search__wrapper">
          <SearchInput :placeHolder="'搜索歌曲'"></SearchInput>
        </div>
        <div v-show="!query">
          <Switches :items="['最近播放', '搜索历史']"></Switches>
          <div class="add-song__list__wrapper">
            <Scroll v-if="type === 0" class="add-song__list__scroll" ref="scrollRef">
              <div class="add-song__list__songs">
                <SongList :songList="playHistory" @select="addSong"></SongList>
              </div>
            </Scroll>
            <Scroll v-if="type === 1" class="add-song__list__scroll" ref="scrollRef">
              <div class="add-song__list__search">
                <SearchList :searches="searchHistory" :canDelete="false"></SearchList>
              </div>
            </Scroll>
          </div>
        </div>
        <div class="add-song__search__result" v-show="query">
          <Suggest></Suggest>
        </div>
        <Message ref="messageRef" :delay="2000">
          <div class="message-title">
            <i class="iconfont icon-ok"></i>
            <span class="message-text">一首歌曲已经被添加</span>
          </div>
        </Message>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, provide, computed, nextTick } from 'vue'
import SearchInput from '../search/search-input.vue'
import Suggest from '../search/suggest.vue'
import Switches from '../base/switches/switches.vue'
import Scroll from '../base/scroll/scroll.vue'
import SongList from '../song-list.vue/song-list.vue'
import SearchList from '../search/search-list.vue'
import { useStore } from 'vuex'
import Message from '../base/message/message.vue'
const visible = ref(false)
const query = ref('')
provide('query', query)
const suggests = ref([])
provide('suggests', suggests)

const scrollRef = ref(null)

const show = async () => {
  visible.value = true
  await nextTick()
  scrollRef.value.scroll.refresh()
}

const hide = () => {
  visible.value = false
}

const hideHandle = () => {
  hide()
}

const messageRef = ref(null)
const type = ref(0)
provide('type', type)
const store = useStore()
const searchHistory = computed(() => store.state.searchHistory)
const playHistory = computed(() => store.state.playHistory)
const addSong = ({ song, index }) => {
  store.dispatch('addSong', song)
  messageRef.value.show()
}

// eslint-disable-next-line no-undef
defineExpose({
  show
})

</script>
<style lang='scss' scoped>
.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 300;
  background: $color-background;

  &__header {
    position: relative;
    height: 44px;
    text-align: center;
  }

  &__title {
    line-height: 44px;
    font-size: $font-size-large;
    color: $color-text;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 8px;

    .iconfont {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: $color-theme;
    }
  }

  &__search {
    &__wrapper {
      margin: 20px;
    }
  }

  &__list {
    &__scroll {
      margin-top: 10px;
      height: calc(100vh - 150px);
      overflow: hidden;
    }

    &__search {
      margin: 0 20px;
    }
  }
}

.message {
  &-title {
    text-align: center;
    height: 44px;
    line-height: 44px;
  }
  &-text {
    margin-left: 10px;
  }
}
</style>
