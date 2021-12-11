/**
 * @Date 2021-02-21 15:14:24
 * @Remark 顶部路由Tag,控制需要的数据
 */

import { Route } from "vue-router";
import { v4 as uuidv4 } from "uuid";

export interface RouteTag {
  uuid: string;
  name: string;
  title: string;
  path: string;
  icon?: string;
}

export const DashboardRouteTag: RouteTag = {
  uuid: uuidv4(),
  name: "Dashboard",
  title: "仪表盘",
  path: "/dashboard",
  icon: "odometer",
};

function isRoute(pet: Route | RouteTag): pet is Route {
  return (pet as Route).hash !== undefined;
}

export function getRouteTagByRoute(route: Route | RouteTag) {
  if (isRoute(route)) {
    const { name, path, meta } = route;
    const title = meta && meta.title ? meta.title : "unknown";
    const result: RouteTag = {
      uuid: uuidv4(),
      name: name || "unknown",
      title,
      path,
    };
    return result;
  }
  return route;
}
