/*
 * @Author: marui
 * @Date: 2021-11-25 18:08:14
 * @Description: ""
 */
/**
 * @Date 2019-07-24 14:23:26
 * @Remark 发布时注意修改APP模式
 */

import { IAppMode, APP_MODE_MAP, Domain } from "./model";

// APP模式
// -----------------------------------------------------------------------
export const APP_MODE = APP_MODE_MAP.DEV; // APP模式
// export const APP_MODE = APP_MODE_MAP.BETA; // APP模式
// export const APP_MODE = APP_MODE_MAP.PROD; // APP模式
export const APP_VERSION = `1.0.0 ${APP_MODE}`; // 版本号
// -----------------------------------------------------------------------

// APP信息
// -----------------------------------------------------------------------
export const APP_NAME = "XXXXX管理平台";
export const APP_ID = "eC2bA2gA"; // 唯一标识, 2021-11-29 17:12:21更新
// -----------------------------------------------------------------------

// 开发环境配置
const DEV_DOMAIN: Domain = {
  api: "",
  media: "",
};

// 测试环境配置
const BETA_DOMAIN: Domain = {
  api: "",
  media: "",
};

// 生产环境配置
const PROD_DOMAIN: Domain = {
  api: "",
  media: "",
};

// -----------------------------------------------------------------------
function chooseDomain(mode: IAppMode): Domain {
  if (mode === APP_MODE_MAP.BETA) {
    return BETA_DOMAIN;
  }
  if (mode === APP_MODE_MAP.PROD) {
    return PROD_DOMAIN;
  }
  return DEV_DOMAIN;
}
export function isDevMode() {
  return APP_MODE === APP_MODE_MAP.DEV;
}
export function isProdMode() {
  return APP_MODE === APP_MODE_MAP.PROD;
}
// 返回server配置
export const APP_DOMAIN = chooseDomain(APP_MODE);
// -----------------------------------------------------------------------
