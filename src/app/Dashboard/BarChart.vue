<template>
  <div id="BarChart" />
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
export default class BarChart extends ResizeChartVm {
  mounted() {
    this.initChart();
  }
  initChart() {
    const el = document.getElementById("BarChart");
    const animationDuration = 6000;
    if (!el) {
      this.$message.error("没有图表挂载点");
      return;
    }
    this.chartB = echarts.init(el);

    const options: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        top: 10,
        left: "2%",
        right: "2%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "pageA",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration,
        },
        {
          name: "pageB",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration,
        },
        {
          name: "pageC",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data: [30, 52, 200, 334, 390, 330, 220],
          animationDuration,
        },
      ],
    };
    this.chartB.setOption(options);
  }
}
</script>

<style scoped lang="scss">
#BarChart {
  height: 100%;
}
</style>
