<template>
  <teleport to="body">
    <transition name="list-fade">
      <div class="playlist" v-show="visible && playlist.length" @click="hide">
        <div class="playlist__wrapper" @click.stop>
          <div class="playlist__header">
            <h1 class="playlist__title" @click="modeChangeHandle">
              <i class="playlist__icon iconfont" :class="modeIcon"></i>
              <span class="playlist__text">{{ modeText }}</span>
            </h1>
            <div class="playlist__clear" @click="showConfirmHandle">
              <i class="iconfont icon-clear"></i>
            </div>
          </div>
          <Scroll class="playlist__content" ref="scrollRef">
            <transition-group ref="listRef" name="list" tag="ul">
              <li
                class="playlist__item"
                v-for="song in sequenceList"
                :key="song.id"
                @click="selectItem(song)"
              >
                <i class="playlist__current iconfont" :class="getCurrentIcon(song)"></i>
                <span class="playlist__text">{{ song.name }}</span>
                <span class="playlist__favorite" @click.stop="toggleFavorite(song)">
                  <i class="iconfont" :class="getFavoriteIcon(song)"></i>
                </span>
                <span
                  class="playlist__delete"
                  :class="{ 'disable': removing }"
                  @click.stop="removeSong(song)"
                >
                  <i class="iconfont icon-delete"></i>
                </span>
              </li>
            </transition-group>
          </Scroll>
          <div class="playlist__add">
            <div class="playlist__add__btn" @click="showAddSongHandle">
              <i class="iconfont icon-add"></i>
              <span class="playlist__add__text">添加歌曲列表</span>
            </div>
          </div>
          <div class="playlist__footer" @click.stop="hide">
            <span>关闭</span>
          </div>
        </div>
        <Confirm
          :text="'是否清空播放列表'"
          :confirm-btn-text="'清空'"
          ref="confirmRef"
          @confirm="confirmClear"
        ></Confirm>
        <AddSong ref="addSongRef"></AddSong>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import Scroll from '../base/scroll/scroll.vue'
import { ref, computed, nextTick, watch } from 'vue'
import { useStore } from 'vuex'
import useMode from './use-mode'
import useFavorite from './use-favorite'
import Confirm from '../base/comfirm/confirm.vue'
import AddSong from '../add-song/add-song.vue'
const visible = ref(false)
const store = useStore()
const playlist = computed(() => store.state.playlist)
const sequenceList = computed(() => store.state.sequenceList)
const currentSong = computed(() => store.getters.currentSong)

const { modeIcon, modeText, modeChangeHandle } = useMode()
const { getFavoriteIcon, toggleFavorite } = useFavorite()

const confirmRef = ref(null)
const showConfirmHandle = () => {
  confirmRef.value.show()
}
const confirmClear = () => {
  store.dispatch('clearSongList')
  hide()
}

const getCurrentIcon = (song) => {
  if (song.id === currentSong.value.id) {
    return 'icon-play'
  }
}

const selectItem = (song) => {
  const index = playlist.value.findIndex((item) => {
    return song.id === item.id
  })

  store.commit('setCurrentIndex', index)
  store.commit('setPlayState', true)
}

const removing = ref(false)
const removeSong = (song) => {
  if (removing.value) {
    return
  }
  removing.value = true
  store.dispatch('removeSong', song)
  if (!playlist.value.length) {
    hide()
  }
  setTimeout(() => {
    removing.value = false
  }, 300)
}

const hide = () => {
  visible.value = false
}
const show = async () => {
  visible.value = true
  await nextTick()
  refreshScroll()
  scrollToCurrent()
}

const scrollRef = ref(null)
const refreshScroll = () => {
  scrollRef.value.scroll.refresh()
}

const listRef = ref(null)
const scrollToCurrent = () => {
  const index = sequenceList.value.findIndex((song) => {
    return currentSong.value.id === song.id
  })
  if (index === -1) {
    return
  }
  const target = listRef.value.$el.children[index]

  scrollRef.value.scroll.scrollToElement(target, 300)
}

watch(currentSong, async (newSong) => {
  if (!visible.value || newSong.id) {
    return
  }
  await nextTick()
  scrollToCurrent()
})
const addSongRef = ref(null)
const showAddSongHandle = () => {
  addSongRef.value.show()
}

// eslint-disable-next-line no-undef
defineExpose({
  show
})

</script>
<style lang='scss' scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;

  &__wrapper {
    background-color: $color-highlight-background;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 210;
    width: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    position: relative;
    padding: 20px 30px 10px 20px;
    justify-content: space-between;
  }

  &__title {
    display: flex;
    align-items: center;
  }

  &__icon {
    margin-right: 10px;
    font-size: 24px;
    color: $color-theme-d;
    transform: scale(0.8);
  }

  &__text {
    flex: 1;
    font-size: $font-size-medium;
    color: $color-text-l;
  }

  &__clear {
    @include extend-click();

    .icon-clear {
      font-size: $font-size-large;
      color: $color-theme-d;
    }
  }

  &__content {
    max-height: 240px;
    overflow: hidden;
  }

  &__item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 30px 0 20px;
    overflow: hidden;
  }

  &__current {
    flex: 0 0 20px;
    width: 20px;
    font-size: $font-size-medium;
    color: $color-theme-d;
  }

  &__text {
    flex: 1;
    @include no-wrap();
    font-size: $font-size-medium;
    color: $color-theme-d;
  }

  &__favorite {
    @include extend-click();
    margin-right: 15px;
    font-size: $font-size-small;
    color: $color-theme;
  }

  &__delete {
    @include extend-click();
    font-size: $font-size-small;
    color: $color-theme;
  }

  &__add {
    text-align: center;
    border-top: 1px solid $color-background;
    height: 49px;
    line-height: 50px;

    .icon-add {
      font-size: $font-size-small;
      margin-right: 5px;
    }
  }

  &__footer {
    background-color: $color-background;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
}

.list-fade-enter-active,
.list-fade-leave-active {
  transition: opacity 0.3s;

  .playlist__wrapper {
    transition: all 0.3s;
  }
}

.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;

  .playlist__wrapper {
    transform: translate3d(0, 100%, 0);
  }
}
</style>
