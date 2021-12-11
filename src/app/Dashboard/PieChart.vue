<template>
  <div id="PieChart" />
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
// lib
import * as echarts from "echarts";
// components & widgets
import ResizeChartVm from "@/public/base/ResizeChartVm";
// config
// script & public
// controller & service
// interface
// 其它

@Component
export default class PieChart extends ResizeChartVm {
  mounted() {
    this.initChart();
  }
  initChart() {
    const el = document.getElementById("PieChart");
    if (!el) {
      this.$message.error("没有图表挂载点");
      return;
    }
    this.chartC = echarts.init(el);

    const options: echarts.EChartsOption = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"],
      },
      series: [
        {
          name: "WEEKLY WRITE ARTICLES",
          type: "pie",
          roseType: "radius",
          radius: [15, 95],
          center: ["50%", "38%"],
          data: [
            { value: 320, name: "Industries" },
            { value: 240, name: "Technology" },
            { value: 149, name: "Forex" },
            { value: 100, name: "Gold" },
            { value: 59, name: "Forecasts" },
          ],
          animationEasing: "cubicInOut",
          animationDuration: 2600,
        },
      ],
    };
    this.chartC.setOption(options);
  }
}
</script>

<style scoped lang="scss">
#PieChart {
  height: 100%;
}
</style>
