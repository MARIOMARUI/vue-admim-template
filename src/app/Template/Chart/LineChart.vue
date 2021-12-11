<template>
  <div>
    <div id="LinChart2" />
  </div>
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
export default class LineChart extends ResizeChartVm {
  mounted() {
    this.initChart();
  }
  initChart() {
    const el = document.getElementById("LinChart2");
    if (!el) {
      this.$message.error("没有图表挂载点");
      return;
    }
    this.chartE = echarts.init(el);

    const options: echarts.EChartsOption = {
      title: {
        text: "示例图表",
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [230, 224, 218, 135, 147, 260, 260, 260, 260],
          type: "line",
        },
      ],
    };
    this.chartE.setOption(options);
  }
}
</script>

<style scoped lang="scss">
#LinChart2 {
  width: 100%;
  height: 600px;
}
</style>
