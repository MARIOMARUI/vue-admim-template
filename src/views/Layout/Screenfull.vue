<template>
  <button class="btn-screenfull" @click="click">
    <i :class="isFullscreen ? 'el-icon-crop' : 'el-icon-full-screen'" />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// lib
import screenfull from "screenfull";
// components & widgets
// config
// script
// controller & service
// interface
// 其它

@Component
export default class Screenfull extends Vue {
  isFullscreen = false;
  mounted() {
    if (screenfull.isEnabled) {
      screenfull.on("change", this.change);
    }
  }
  beforeDestroy() {
    if (screenfull.isEnabled) {
      screenfull.off("change", this.change);
    }
  }
  change() {
    const sc: any = screenfull;
    this.isFullscreen = sc.isFullscreen;
  }
  click() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    } else {
      this.$message.warning("你的浏览器不支持全屏");
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-screenfull {
  width: 40px;
  height: 40px;
  font-size: 22px;
  margin-right: 10px;
}
</style>
