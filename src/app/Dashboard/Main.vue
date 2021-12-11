<template>
  <div class="content-main">
    <!-- <line-chart /> -->
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// lib
// components & widgets
import LineChart from "./LineChart.vue";
import RaddarChart from "./RaddarChart.vue";
import PieChart from "./PieChart.vue";
import BarChart from "./BarChart.vue";
// config
// script & public
// controller & service
// interface
// 其它

@Component({
  components: {
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
  },
})
export default class Dashboard extends Vue {}
</script>

<style scoped lang="scss">
.content-main {
  background-color: #f0f2f5;
  .chart-wrapper {
    background-color: #fff;
    padding: 16px 16px 0;
    height: 300px;
  }
}
</style>
