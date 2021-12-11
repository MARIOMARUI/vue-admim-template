<template>
  <div id="RaddarChart" />
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
    const el = document.getElementById("RaddarChart");
    const animationDuration = 3000;
    if (!el) {
      this.$message.error("没有图表挂载点");
      return;
    }
    this.chartD = echarts.init(el);

    const options: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      radar: {
        radius: "66%",
        center: ["50%", "42%"],
        splitNumber: 8,
        splitArea: {
          areaStyle: {
            color: ["rgba(127,95,132,.3)"],
            opacity: 1,
            shadowBlur: 45,
            shadowColor: "rgba(0,0,0,.5)",
            shadowOffsetX: 0,
            shadowOffsetY: 15,
          },
        },
        indicator: [
          { text: "销售（sales）", max: 6500 },
          { text: "管理（Administration）", max: 16000, color: "red" }, // 标签设置为红色
          { text: "信息技术（Information Techology）", max: 30000 },
          { text: "客服（Customer Support）", max: 38000 },
          { text: "研发（Development）", max: 52000 },
          { text: "市场（Marketing）", max: 25000 },
        ],
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["Allocated Budget", "Expected Spending", "Actual Spending"],
      },
      series: [
        {
          type: "radar",
          symbolSize: 0,
          areaStyle: {
            shadowBlur: 13,
            shadowColor: "rgba(0,0,0,.2)",
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1,
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: "Allocated Budget",
            },
            {
              value: [4000, 9000, 15000, 15000, 13000, 11000],
              name: "Expected Spending",
            },
            {
              value: [5500, 11000, 12000, 15000, 12000, 12000],
              name: "Actual Spending",
            },
          ],
          animationDuration,
        },
      ],
    };
    this.chartD.setOption(options);
  }
}
</script>

<style scoped lang="scss">
#RaddarChart {
  height: 100%;
}
</style>
