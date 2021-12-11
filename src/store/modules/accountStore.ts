/**
 * @Date 2021-11-29 10:23:00
 * @Remark 账户状态
 */

// lib
import { Route, RouteConfig } from "vue-router";
// config
import { LOCAL_STORAGE_ACCOUNT, LOCAL_STORAGE_AUTH } from "@/config/setting";
// script & methods & public
import logUtils from "@/utils/logUtils";
import storageUtils from "@/utils/storageUtils";
// biz
// store
// service
// interface && type
import { Account, BLANK_ACCOUNT } from "@/biz/authorize/model";
import { getRouteTagByRoute, RouteTag } from "@/public/model/RouteTag";
// 其它

export interface AccountStore {
  token: string;
  account: Account;
  routers: RouteConfig[];
  tagViews: RouteTag[];
  companyId: string;
}

function syncAccount() {
  const localAccount = storageUtils.getStore<Account>(LOCAL_STORAGE_ACCOUNT, false);
  return localAccount || BLANK_ACCOUNT;
}

export const accountStore = {
  state: () => {
    const state: AccountStore = {
      token: "",
      account: syncAccount(),
      routers: [],
      tagViews: [],
      companyId: "",
    };
    return state;
  },
  mutations: {
    SET_TOKEN(state: AccountStore, payload: string | undefined) {
      if (payload && payload !== "") {
        logUtils.info("设置token", `${payload.slice(0, 10)}...`);
        // 变更状态
        state.token = payload;
        storageUtils.setStore<string>(LOCAL_STORAGE_AUTH, payload, true);
      } else {
        logUtils.info("删除token", payload);
        state.token = "";
        storageUtils.removeStore(LOCAL_STORAGE_AUTH);
      }
    },
    SET_ACCOUNT(state: AccountStore, payload: Account) {
      state.account = payload;
      storageUtils.setStore<Account>(LOCAL_STORAGE_ACCOUNT, payload, false);
    },
    SET_ROUTERS: (state: AccountStore, routers: RouteConfig[]) => {
      state.routers = routers;
    },
    ADD_TAG: (state: AccountStore, route: Route | RouteTag) => {
      if (state.tagViews.some((el) => el.path === route.path)) {
        return;
      }
      state.tagViews.push(getRouteTagByRoute(route));
    },
    DEL_TAG: (state: AccountStore, route: RouteTag) => {
      const newList = [...state.tagViews].filter((el) => el.path !== route.path);
      state.tagViews = newList;
    },
    DEL_TAG_OTHER: (state: AccountStore, route: RouteTag | null) => {
      if (route) {
        const newList = [...state.tagViews].filter(
          (el) => el.path === route.path || el.name === "Dashboard",
        );
        state.tagViews = newList;
      } else {
        const newList = [...state.tagViews].filter((el) => el.name === "Dashboard");
        state.tagViews = newList;
      }
    },
  },
  getters: {
    accountRouters: (state: AccountStore) => {
      return state.routers;
    },
    accountInfo: (state: AccountStore) => state.account,
    accountToken: (state: AccountStore) => state.token,
    accountTagViews: (state: AccountStore) => state.tagViews,
  },
};
