/**
 * @Date 2021-11-29 10:23:00
 * @Remark
 */

// script
import store from "@/store";
import router from "./index";
// config
import bizRouters from "@/config/routers";
import { ROOT_ADMIN_ID, ROUTE_MODE } from "@/config/setting";
// model
import { RouteConfig } from "vue-router";

export function setRouterAndAccess() {
  const routers = [...bizRouters];

  const account = store.state.account.account;
  const accountId = account.id;
  const accountMenus = account.menuList; // 用户有权访问的菜单
  // 设置meta信息是否有权访问
  const loop = (list: RouteConfig[]) => {
    list.forEach((el) => {
      const isAccess = !!accountMenus.find((item) => item.sysMenuCode === el.name);
      if (el.meta) {
        // 根管理员可以访问所有菜单
        // eslint-disable-next-line no-param-reassign
        el.meta.access = ROUTE_MODE === "static" || accountId === ROOT_ADMIN_ID ? true : isAccess; // 需要递归循环加入
      }
      if (el.children && el.children.length > 0) {
        loop(el.children);
      }
    });
  };
  loop(routers);
  routers.forEach((el) => {
    router.addRoute("Home", el);
  });
  store.commit("SET_ROUTERS", routers);
}
