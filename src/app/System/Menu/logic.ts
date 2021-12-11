/**
 * @Date 2021-02-20 17:23:534
 * @Remark
 */

import bizRouters from "@/config/routers";
import { v4 as uuidv4 } from "uuid";
import { RouteConfig } from "vue-router";
import { MenuOption } from "./model";

export function getRoutersList(): MenuOption[] {
  const result: MenuOption[] = [];

  const loop = (list: RouteConfig[]) => {
    list.forEach((el) => {
      const item: MenuOption = {
        uuid: uuidv4(),
        title: el.meta?.title || "未命名路由",
        code: el.name || "未具名路由",
        path: el.path,
      };
      result.push(item);
      if (el.children && el.children.length > 0) {
        loop(el.children);
      }
    });
  };

  loop(bizRouters);

  return result;
}
