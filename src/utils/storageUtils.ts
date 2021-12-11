/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// lib
import _ from "lodash";
import store from "store";
// utils
import logUtils from "@/utils/logUtils";
import encryptUtils from "./encryptUtils";
// config
import { APP_ID } from "@/config/env";
// 其它

/**
 * 处理名称
 */
function getStoreName(name: string) {
  return `${APP_ID}_${name}`;
}

/**
 * 尝试保存store数据,错误的话返回false
 */
function setStore<T>(name: string, data: T, encryption = false): boolean {
  const dataName = getStoreName(name);
  try {
    const save = encryption ? encryptUtils.encrypt(data) : JSON.stringify(data);
    store.set(dataName, save);
    return true;
  } catch (error) {
    logUtils.error(error as any, "setStore");
    return false;
  }
}

/**
 * 尝试读取store数据,没有或错误的话返回null
 */
function getStore<T>(name: string, encryption = false): T | null {
  const dataName = getStoreName(name);
  try {
    const data = store.get(dataName);
    if (data) {
      const result: T = encryption ? encryptUtils.decrypt(data) : JSON.parse(data);
      return result;
    }
    return null;
  } catch (error) {
    logUtils.error(error as any, "getStore");
    return null;
  }
}

/**
 * 删除某一个store值
 */
function removeStore(name: string): void {
  const dataName = getStoreName(name);
  store.remove(dataName);
}

/**
 * 删除所有store值
 */
function clearStore(): void {
  store.each((value, key) => {
    if (_.startsWith(key, APP_ID)) {
      store.remove(key);
    }
  });
}

export default {
  setStore,
  getStore,
  removeStore,
  clearStore,
};
