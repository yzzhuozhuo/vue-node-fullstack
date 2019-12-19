<template>
  <div class="card p-3 bg-white mt-3">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xxl flex-1 px-2">{{ title }}</div>
      <i class="iconfont icon-menu"></i>
    </div>
    <div class="card-body pt-3">
      <!-- 插槽就是预留了一个位置，然后在外边引入该组件时，可以将调用时传递的内容，显示在这里 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>