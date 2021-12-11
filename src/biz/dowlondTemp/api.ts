/**
 * @Date 2021-02-22 11:23:46
 * @Remark
 */

import { Api } from "@/public/model/api";
import { ResObject } from "@/public/model/base";

/**
 * api
 */
export const API_TEMP_DATA: Api = {
  title: "静态数据-业主模板",
  path: "static/业主模板.xlsx",
  method: "STATIC",
  prefix: "",
};
export const API_WATER_METER_TEMP_DATA: Api = {
  title: "静态数据-水表模板",
  path: "static/水表模板.xlsx",
  method: "STATIC",
  prefix: "",
};
export const API_RECHANGE_WATER_TEMP_DATA: Api = {
  title: "静态数据-批量充值模板",
  path: "static/批量充值.xlsx",
  method: "STATIC",
  prefix: "",
};

// req

// res
export type ResTempData = ResObject<any>;
