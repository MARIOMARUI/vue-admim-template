/*
 * @Author: marui
 * @Date: 2021-11-25 18:08:14
 * @Description: ""
 */
/**
 * @Date 2021-11-29 10:23:00
 * @Remark app
 */

import { AreaMap } from "@/biz/area/model";
import { Menu } from "@/biz/menu/model";
import { Permission } from "@/biz/permission/model";
import { Role } from "@/biz/role/model";
import { AllocableCelllist } from "@/biz/admin/model";

export interface DictStore {
  roleList: Role[];
  villageList: AllocableCelllist[];
  menuList: Menu[];
  permList: Permission[];
  areaMap: AreaMap | undefined;
}

export const dictStore = {
  state: () => {
    const state: DictStore = {
      roleList: [],
      villageList: [],
      menuList: [],
      permList: [],
      areaMap: undefined,
    };
    return state;
  },
  mutations: {
    SET_ROLE_LIST(state: DictStore, payload: Role[]) {
      state.roleList = payload;
    },
    SET_VILLAGE_LIST(state: DictStore, payload: AllocableCelllist[]) {
      state.villageList = payload;
    },
    SET_MENU_LIST(state: DictStore, payload: Menu[]) {
      state.menuList = payload;
    },
    SET_PERM_LIST(state: DictStore, payload: Permission[]) {
      state.permList = payload;
    },
    SET_AREA_MAP(state: DictStore, payload: AreaMap) {
      state.areaMap = payload;
    },
  },
  actions: {},
};
