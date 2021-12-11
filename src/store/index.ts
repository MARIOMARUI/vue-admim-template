/**
 * @Date 2021-11-29 10:23:00
 * @Remark 分模块处理store
 */

import Vue from "vue";
import Vuex from "vuex";
import { AccountStore, accountStore } from "./modules/accountStore";
import { AppStore, appStore } from "./modules/appStore";
import { DictStore, dictStore } from "./modules/dictStore";

Vue.use(Vuex);

export interface StoreState {
  app: AppStore;
  account: AccountStore;
  dict: DictStore;
}

export default new Vuex.Store<StoreState>({
  modules: {
    app: appStore,
    account: accountStore,
    dict: dictStore,
  },
});
