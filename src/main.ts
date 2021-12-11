/*
 * @Author: marui
 * @Date: 2021-11-25 18:08:14
 * @LastEditTime: 2021-12-02 10:57:28
 * @Description: ""
 */
// vue
import Vue from "vue";
// lib
import ElementUI from "element-ui";
import NProgress from "nprogress"; // progress bar
import dataV from "@jiaminghi/data-view";

// style
import "@/style/alisa.scss";
import "@/style/iconfont/iconfont.css";
import "nprogress/nprogress.css";
import "element-ui/lib/theme-chalk/index.css";
// config
import { ELEMENT_UI_BASE_SIZE } from "./config/theme";
// directive
import permission from "@/public/directive/permission";
// components & widgets
import App from "@/App.vue";
// script
import router from "@/router";
import store from "@/store";
// interface
// 其它

Vue.config.productionTip = false;

// 自定义指令
Vue.directive("permission", permission); // 权限指令
// 配置
Vue.use(ElementUI, { size: ELEMENT_UI_BASE_SIZE });
// 进度条
NProgress.configure({
  showSpinner: false,
});

// 可视化
Vue.use(dataV);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
