<template>
  <el-scrollbar
    class="scroll-container"
    ref="scrollContainer"
    :vertical="false"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ScrollArea extends Vue {
  scrollWrapper: any | undefined = undefined;
  mounted() {
    const ref: any = this.$refs.scrollContainer;
    this.scrollWrapper = ref.$refs.wrap;
  }
  handleScroll(e: any) {
    const $wrapper = this.scrollWrapper;
    if ($wrapper) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      $wrapper.scrollLeft += eventDelta / 4;
    }
    // $
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  position: relative;

  .el-scrollbar__wrap {
    height: 28px;
  }
}
</style>
