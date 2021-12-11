/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

import { Api } from "@/public/model/api";
import { ReqByStrId, ReqPage, ResBoolean, ResObject, ResPage } from "@/public/model/base";
import { Menu } from "./model";

/**
 * api
 */
export const API_MENU_PAGE: Api = {
  title: "菜单分页",
  path: "menu/list",
  method: "POST",
  prefix: "api/backstage",
  remark: "菜单menu操作接口",
};

// req
export interface ReqMenuPage extends ReqPage {
  sysMenuCode?: string;
  sysMenuName?: string;
}

// res
export type ResMenuPage = ResPage<Menu>;

/**
 * api
 */
export const API_MENU_ADD: Api = {
  title: "添加菜单",
  path: "menu/add",
  method: "POST",
  prefix: "api/backstage",
  remark: "菜单menu操作接口",
};

// req
export interface ReqMenuAdd {
  sysMenuCode: string;
  // sysMenuIcon: string;
  sysMenuName: string;
  sysMenuUrl: string;
}

// res
export type ResMenuAdd = ResObject<Menu>;

/**
 * api
 */
export const API_MENU_UPDATE: Api = {
  title: "编辑菜单",
  path: "menu/update",
  method: "POST",
  prefix: "api/backstage",
  remark: "菜单menu操作接口",
};

// req
export interface ReqMenuUpdate extends ReqByStrId, ReqMenuAdd {}

// res
export type ResMenuUpdate = ResObject<Menu>;

/**
 * api
 */
export const API_MENU_DEL: Api = {
  title: "删除菜单",
  path: "menu/delete",
  method: "POST",
  prefix: "api/backstage",
  remark: "菜单menu操作接口",
};

// req
export type ReqMenuDel = ReqByStrId;

// res
export type ResMenuDel = ResBoolean;
