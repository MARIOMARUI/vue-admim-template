<template>
  <div id="LinChart" />
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
    const el = document.getElementById("LinChart");
    const expectedData = [100, 120, 161, 134, 105, 160, 165];
    const actualData = [120, 82, 91, 154, 162, 140, 145];
    if (!el) {
      this.$message.error("没有图表挂载点");
      return;
    }
    this.chartA = echarts.init(el);
    const options: echarts.EChartsOption = {
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        boundaryGap: false,
        axisTick: {
          show: false,
        },
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 30,
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        padding: [5, 10],
      },
      yAxis: {
        axisTick: {
          show: false,
        },
      },
      legend: {
        data: ["expected", "actual"],
      },
      series: [
        {
          name: "expected",
          itemStyle: {
            color: "#FF005A",
          },
          lineStyle: {
            color: "#FF005A",
            width: 2,
          },
          smooth: true,
          type: "line",
          data: expectedData,
          animationDuration: 2800,
          animationEasing: "cubicInOut",
        },
        {
          name: "actual",
          smooth: true,
          type: "line",
          itemStyle: {
            color: "#3888fa",
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: "quadraticOut",
        },
      ],
    };
    this.chartA.setOption(options);
  }
}
</script>

<style scoped lang="scss">
#LinChart {
  width: 100%;
  height: 350px;
}
</style>
