/*
 * @Author: marui
 * @Date: 2021-11-25 18:08:14
 * @Description: ""
 */
/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// lib
import { Route } from "vue-router";
import NProgress from "nprogress"; // progress bar
import _ from "lodash";
// config
import { APP_NAME } from "@/config/env";
import { setRouterAndAccess } from "./logic";
// state
import store from "@/store";
// script & public
import browserUtils from "@/utils/browserUtils";
import { getToken } from "@/public/logic/token";

export function beforeEachAction(to: Route, from: Route, next: any) {
  NProgress.start();
  const token = getToken();
  if (token && token !== "") {
    // 登录了
    if (to.name === "Login") {
      // 登录了不能再次登录
      next("/");
    } else if (store.state.account.routers.length === 0) {
      setRouterAndAccess(); // 设置路由
      next({ ...to, replace: true }); // 确保addRoute已完成
    } else if (to.meta) {
      if (!_.isUndefined(to.meta.access) && !to.meta.access) {
        // 无权限访问
        next({ name: "403" });
      } else {
        next();
      }
    } else {
      next();
    }
  } else if (to.name === "Login") {
    next();
  } else {
    next({ name: "Login" });
  }
}

export function afterEachAction(to: Route) {
  const flag = to.meta && to.meta.title && to.meta.title !== "";
  const browserHeaderTitle = flag ? `${to.meta.title} - ${APP_NAME}` : APP_NAME;
  browserUtils.setTitle(browserHeaderTitle);
  NProgress.done();
  window.scrollTo(0, 0); // 页面跳转后滚动条置顶
}
