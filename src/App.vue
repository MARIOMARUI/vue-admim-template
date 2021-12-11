<!--
 * @Descripttion:
 * @version:
 * @Author: marui
 * @Date: 2021-02-20 16:45:10
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  mounted() {
    //
  }
  beforeDestroy() {
    //
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
