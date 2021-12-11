/**
 * @Date 2021-01-05 17:16:15
 * @Remark 四个基本够了
 */

// lib
import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";
// config
// script & methods & public
import logUtils from "@/utils/logUtils";
// biz
// store
// service
// interface && type
// 其它

@Component
export default class ResizeChartBase extends Vue {
  chartA: any | null = null;
  chartB: any | null = null;
  chartC: any | null = null;
  chartD: any | null = null;
  chartE: any | null = null;
  chartF: any | null = null;
  $_resizeHandler: any | null = null;
  mounted() {
    this.initListener();
  }
  beforeDestroy() {
    this.destroyListener();
  }
  initListener() {
    logUtils.info("ResizeChartBase", "添加图表响应式监听");
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.$_resizeHandler = _.debounce(() => {
      this.resize();
    }, 100);
    window.addEventListener("resize", this.$_resizeHandler);
  }
  destroyListener() {
    logUtils.info("ResizeChartBase", "移除图表响应式监听");
    window.removeEventListener("resize", this.$_resizeHandler);
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.$_resizeHandler = null;
  }
  resize() {
    const { chartA, chartB, chartC, chartD, chartE, chartF } = this;
    chartA && chartA.resize();
    chartB && chartB.resize();
    chartC && chartC.resize();
    chartD && chartD.resize();
    chartE && chartE.resize();
    chartF && chartF.resize();
  }
}
