/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */
// lib
// config
// script & methods & public
// http
// state
import store from "@/store";
// service
import {
  simplePageService,
  simpleObjectService,
  simpleBooleanService,
} from "@/public/service/simple.service";
// api
import {
  ReqMenuPage,
  ResMenuPage,
  API_MENU_PAGE,
  ReqMenuAdd,
  API_MENU_ADD,
  ResMenuAdd,
  API_MENU_UPDATE,
  ReqMenuUpdate,
  ResMenuUpdate,
  API_MENU_DEL,
  ReqMenuDel,
  ResMenuDel,
} from "./api";
// interface && type && class
import { Menu } from "./model";
// 其它

// 菜单分页
export async function getMenuPageService(params: ReqMenuPage) {
  return simplePageService<ReqMenuPage, ResMenuPage, Menu>(API_MENU_PAGE, params);
}

// 菜单列表
export async function getMenuListService() {
  const data = await simplePageService<ReqMenuPage, ResMenuPage, Menu>(API_MENU_PAGE, {
    pageNum: 1,
    pageSize: 100,
  });
  if (data.payload) {
    store.commit("SET_MENU_LIST", data.payload.list);
  }
  return data;
}

// 菜单添加
export async function addMenuService(params: ReqMenuAdd) {
  return simpleObjectService<ReqMenuAdd, ResMenuAdd, Menu>(API_MENU_ADD, params);
}

// 菜单编辑
export async function updateMenuService(params: ReqMenuUpdate) {
  return simpleObjectService<ReqMenuUpdate, ResMenuUpdate, Menu>(API_MENU_UPDATE, params);
}

// 菜单删除
export async function delMenuService(id: string) {
  return simpleBooleanService<ReqMenuDel, ResMenuDel>(API_MENU_DEL, {
    id,
  });
}
