/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

import { isProdMode } from "./env";

// ROOT管理员账户ID
export const ROOT_ADMIN_ID = "580008767466246144";
// 加密key
export const CRYPTO_KEY = "zH1cD0aA0dH4nD1a";
// 超时连接
export const TIMEOUT = {
  SHORT: 20000,
  LONG: 60000,
};
// 基础本地存储数据
export const LOCAL_STORAGE_AUTH = "htua";
export const LOCAL_STORAGE_ACCOUNT = "account";
export const LOCAL_STORAGE_VERSION = "version";
// 验证码
export const VERIFY_CODE_LENGTH = 6;
export const VERIFY_CODE_TIME = isProdMode() ? 60 : 10;
// 路由模式
export const ROUTE_MODE: "static" | "dynamic" = "dynamic"; // 静态就显示全部路由不做控制,动态就根据账户返回的状态控制
// 表格
export const TABLE_SETTING = {
  PAGE: 1,
  SIZE: 15,
  PAGINATION: {
    layout: "total, sizes, prev, pager, next, jumper",
    pageSizes: [3, 10, 15, 30, 50, 100],
  },
};
// 图片尺寸限制,单位MB
export const UPLOAD = {
  IMAGE_MAX_SIZE: 2,
  VIDEO_MAX_SIZE: 500,
  OFFICE_MAX_SIZE: 5,
  PDF_MAX_SIZE: 150,
  COMPRESSION_MAX_SIZE: 50,
  ALL_MAX_SIZE: 100,
};
// 表单
export const MODAL_FORM_LAYOUT_8_16 = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
// goEasy
export const GOEASY = {
  OPEN: true, // 是否开启goeasy
  HOST: "hangzhou.goeasy.io", // [hangzhou.goeasy.io |singapore.goeasy.io]
  APPKEY: "BC-c4a0cf01713843e7bbd07402310df444", // 应用appkey
  MODULES: ["pubsub"],
  /*
  Goeasy 账号
  15528583981
  scyh1234
  */
  /*
  阿里云账户
  登录名：亿海科技
  登录密码：yhkj123123
  */
  /**
  * 管理后台权限账号：
  * rootadmin
  * ztxt1234
  * userid:  ↑↑↑↑（ROOT_ADMIN_ID）
  */
};
