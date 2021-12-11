<template>
  <dv-border-box-12>
    <div id="center_map" class="center_map"></div>
  </dv-border-box-12>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as echarts from "echarts";
import "../js/china";

@Component
export default class CenterMap extends Vue {
  mapName = "china";
  //   小点坐标
  geoCoordMap: any = {
    台湾: [122, 23],
    黑龙江: [129, 47],
    内蒙古: [110.3467, 41.4899],
    吉林: [125.8154, 44.2584],
    北京市: [116.4551, 40.2539],
    辽宁: [123.1238, 42.1216],
    河北: [114.4995, 38.1006],
    天津: [117.4219, 39.4189],
    山西: [112.3352, 37.9413],
    陕西: [109.1162, 34.2004],
    甘肃: [103.5901, 36.3043],
    宁夏: [106.3586, 38.1775],
    青海: [101.4038, 36.8207],
    新疆: [87.9236, 43.5883],
    西藏: [88.388277, 31.56375],
    四川: [103.9526, 30.7617],
    重庆: [108.384366, 30.439702],
    山东: [117.1582, 36.8701],
    河南: [113.4668, 34.6234],
    江苏: [118.8062, 31.9208],
    安徽: [117.29, 32.0581],
    湖北: [114.3896, 30.6628],
    浙江: [119.5313, 29.8773],
    福建: [119.4543, 25.9222],
    江西: [116.0046, 28.6633],
    湖南: [113.0823, 28.2568],
    贵州: [106.6992, 26.7682],
    云南: [102.9199, 25.4663],
    广东: [113.12244, 23.009505],
    广西: [108.479, 23.1152],
    海南: [110.3893, 19.8516],
    上海: [121.4648, 31.2891],
  };
  //   小点代表的省的值（有多少个市）
  data: any = [
    { name: "台湾", value: 1 },
    { name: "北京", value: 2 },
    { name: "天津", value: 3 },
    { name: "河北", value: 4 },
    { name: "山西", value: 5 },
    { name: "内蒙古", value: 6 },
    { name: "辽宁", value: 7 },
    { name: "吉林", value: 8 },
    { name: "黑龙江", value: 9 },
    { name: "上海", value: 10 },
    { name: "江苏", value: 11 },
    { name: "浙江", value: 12 },
    { name: "安徽", value: 13 },
    { name: "福建", value: 14 },
    { name: "江西", value: 15 },
    { name: "山东", value: 16 },
    { name: "河南", value: 17 },
    { name: "湖北", value: 18 },
    { name: "湖南", value: 19 },
    { name: "重庆", value: 20 },
    { name: "四川", value: 21 },
    { name: "贵州", value: 22 },
    { name: "云南", value: 23 },
    { name: "西藏", value: 24 },
    { name: "陕西", value: 25 },
    { name: "甘肃", value: 26 },
    { name: "青海", value: 27 },
    { name: "宁夏", value: 28 },
    { name: "新疆", value: 29 },
    { name: "广东", value: 30 },
    { name: "广西", value: 31 },
    { name: "海南", value: 32 },
  ];
  myChart: any = null;
  mounted() {
    this.initChart();
  }
  async initChart() {
    const el = document.getElementById("center_map");
    if (!el) {
      this.$message.error("没有图表挂载点");
      return;
    }
    this.myChart = echarts.init(el);
    window.onresize = this.myChart.resize;

    const options: echarts.EChartsOption = {
      // 进行相关配置
      tooltip: {}, // 鼠标移到图里面的浮动提示框
      //  backgroundColor: '#020933',
      geo: {
        // 这个是重点配置区
        map: this.mapName, // 表示中国地图和china.js中的registerMap相对应
        roam: false, // 是否开启鼠标缩放和平移漫游。 设置成false 不允许缩放和平移 下方设置不生效
        // center: [103.29, 30.71], // 视觉中心
        // aspectScale: 0.75, // 长宽比例
        zoom: 1.2, // 初始缩放等级  这里和下边series.type必须保持一致， 否则 会导致重影
        // 缩放最大最小等级
        // scaleLimit: {
        //   min: 1,
        //   max: 8,
        // },
        itemStyle: {
          borderColor: "#293171",
          borderWidth: 2,
          areaColor: "#0A0F33",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        emphasis: {
          label: {
            show: false, // 是否在高亮状态下显示标签  （未生效）
          },
        },
      },
      series: [
        {
          type: "map", // 地图类型
          // 地图上文字
          label: {
            show: true, // 是否显示标签
            color: "#fff",
          },
          // 地图区域的多边形 图形样式
          itemStyle: {
            borderColor: "#2ab8ff",
            borderWidth: 1.5,
            areaColor: "#12235c",
          },
          //   鼠标移入的样式，高亮
          emphasis: {
            itemStyle: {
              areaColor: "#2AB8FF",
              borderWidth: 0,
            },
          },
          zoom: 1.2, // 当前视角的缩放比例
          // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          // roam: false,
          map: this.mapName, // 使用中国地图
        },
        // 气泡图
        {
          type: "scatter",
          coordinateSystem: "geo",
          // 标记的图形 这里使用别针
          symbol: "pin",
          symbolSize: [40, 40],
          symbolOffset: [0, 0],
          itemStyle: {
            color: "#1E90FF", // 标志颜色
          },
          label: {
            show: true,
            color: "#fff",
            fontSize: 8,
            formatter(value: any) {
              return value.data.value[2];
            },
          },
          // 给区域赋值
          data: this.convertData(this.data),
        },
      ],
    };
    this.myChart.setOption(options);
  }
  // 改造气泡数据
  convertData(data: any) {
    const res = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      const geoCoord = this.geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    return res;
  }
}
</script>
<style lang="scss" scoped>
.center_map {
  width: 100%;
  height: 100%;
  //   background-color: #fff;
  color: #000;
}
</style>
