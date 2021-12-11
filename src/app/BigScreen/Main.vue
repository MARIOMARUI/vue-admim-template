<template>
  <div id="data-view">
    <!-- <dv-full-screen-container> -->
   <datav />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import datav from "./datav/index.vue";

@Component({
  components: {
    datav,
  },
})
export default class BigScreen extends Vue {
  loading = true;
  // 改变loading状态
  cancelLoading() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
// @import "./index.scss";
</style>
