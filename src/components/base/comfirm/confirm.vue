<template>
  <teleport to="body">
    <transition name="comfirm-fade">
      <div class="confirm" v-show="visible">
        <div class="confirm__wrapper">
          <div class="confirm__content">
            <p class="confirm__text">{{ text }}</p>
            <div class="confirm__oper">
              <div
                class="confirm__oper__btn confirm__oper__btn--left"
                @click="confirmHandle"
              >{{ confirmBtnText }}</div>
              <div
                class="confirm__oper__btn confirm__oper__btn--right"
                @click="cancleHandle"
              >{{ cancelBtnText }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
// eslint-disable-next-line no-undef
defineProps({
  text: {
    type: String,
    default: ''
  },
  confirmBtnText: {
    type: String,
    default: '确认'
  },
  cancelBtnText: {
    type: String,
    default: '取消'
  }
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['confirm', 'cancel'])

const visible = ref(false)

const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}

const confirmHandle = () => {
  hide()
  emit('confirm')
}

const cancleHandle = () => {
  hide()
  emit('cancel')
}

// eslint-disable-next-line no-undef
defineExpose({
  show
})

</script>
<style lang='scss' scoped>
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: $color-background-d;

  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

  &__content {
    width: 270px;
    border-radius: 13px;
    background-color: $color-highlight-background;
  }

  &__text {
    width: 270px;
    border-radius: 13px;
    text-align: center;
    padding: 20px 30px;
    box-sizing: border-box;
    background-color: $color-highlight-background;
  }

  &__oper {
    display: flex;
    align-items: center;
    text-align: center;

    &__btn {
      flex: 1;
      line-height: 22px;
      padding: 10px 0;
      border-top: 1px solid $color-background-d;
      color: $color-text-l;
      font-size: $font-size-medium;

      &--left {
        border-right: 1px solid $color-background-d;
        color: $color-text;
        font-size: $font-size-large;
      }
    }
  }
}

.confirm-fade-enter-active {
  animation: confirm-fadein 0.3s;

  .confirm__content {
    animation: confirm-zoom-in 0.3s;
  }
}

.confirm-fade-leave-active {
  animation: confirm-fadeout 0.3s;

  .confirm__content {
    animation: confirm-zoom-out 0.3s;
  }
}

@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes confirm-fadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes confirm-zoom-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes confirm-zoom-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
