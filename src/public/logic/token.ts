/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */
// lib
// config
import { LOCAL_STORAGE_AUTH } from "@/config/setting";
// script & methods & public
import storageUtils from "@/utils/storageUtils";
// biz
// store
import store from "@/store";
// service
// interface && type
import { AxiosResponse } from "axios";
// 其它

export function getResToken(res: AxiosResponse<any>): string | undefined {
  if (!res.headers || !res.headers.authorization || res.headers.authorization === "") {
    return undefined;
  }
  return res.headers.authorization;
}

export function getToken() {
  const stateToken: string = store.getters.accountToken;
  if (stateToken !== "") {
    return stateToken;
  }
  // 如果内存中没有,尝试在本地获得
  const localToken = storageUtils.getStore<string>(LOCAL_STORAGE_AUTH, true);
  if (localToken && localToken !== "") {
    store.commit("SET_TOKEN", localToken);
    return localToken;
  }
  return "";
}

export default {
  getResToken,
  getToken,
};
