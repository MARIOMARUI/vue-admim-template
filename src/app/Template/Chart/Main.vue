<template>
  <div class="content-main">
    <line-chart />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// lib
// components & widgets
import LineChart from "./LineChart.vue";
// config
// script & public
// controller & service
// interface
// 其它

@Component({
  components: {
    LineChart,
  },
})
export default class TemplateChart extends Vue {}
</script>

<style lang="scss"></style>
