/**
 * @Date 2021-11-29 10:23:00
 * @Remark app
 */

export interface AppStore {
  menuCollapse: boolean;
  browserHeaderTitle: string;
}

export const appStore = {
  state: () => {
    const state: AppStore = {
      menuCollapse: false,
      browserHeaderTitle: "",
    };
    return state;
  },
  mutations: {
    SET_MENU_COLLAPSE(state: AppStore, payload: boolean) {
      // 变更状态
      state.menuCollapse = payload;
    },
    SET_BROWSER_HEADER_TITLE(state: AppStore, payload: string) {
      // 变更状态
      state.browserHeaderTitle = payload;
    },
  },
  getters: {},
};
