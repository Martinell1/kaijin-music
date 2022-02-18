<template>
  <div class="header">
    <img width="30" height="30" src="../../assets/images/icon.png" />
    <h1 class="header__title">Kaijin-Music</h1>
    <router-link :to="{ name: 'User' }" class="header__icon">
      <i class="iconfont icon-user"></i>
    </router-link>
  </div>
</template>

<script setup>
</script>
<style lang='scss' scoped>
.header {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  color: $color-theme;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 50%;
  }

  &__icon {
    color: $color-theme;
  }

  .iconfont {
    position: absolute;
    right: 0;
    top: 0;
    font-size: $font-size-large-x;
    margin-right: 10px;
  }
}
</style>
