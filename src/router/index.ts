/**
 * @Date 2021-11-29 10:23:00
 * @Remark
 */

// lib
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// view
import Login from "@/views/Login/Main.vue";
import Home from "@/views/Home/Main.vue";
// logic
import { beforeEachAction, afterEachAction } from "./action";
// model
import { DashboardRouteTag } from "@/public/model/RouteTag";
// 其它

Vue.use(VueRouter);

// 不需要权限的基础路由
const staticRouterMap: RouteConfig[] = [
  {
    path: "/",
    redirect: DashboardRouteTag.path,
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "系统登录",
    },
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: DashboardRouteTag.path,
        name: DashboardRouteTag.name,
        meta: {
          title: DashboardRouteTag.title,
          icon: DashboardRouteTag.icon,
        },
        component: () => import("@/app/Dashboard/Main.vue"),
      },
    ],
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/ErrorPage/403.vue"),
  },
  {
    path: "*",
    component: () => import("@/views/ErrorPage/404.vue"),
  },
];

// 设置路由
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: staticRouterMap,
});

router.beforeEach(beforeEachAction);
router.afterEach(afterEachAction);

export default router;
