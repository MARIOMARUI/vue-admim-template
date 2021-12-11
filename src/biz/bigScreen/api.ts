/*
 * @Author: marui
 * @Date: 2021-11-25 18:08:14
 * @Description: ""
 */
/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

import { Api } from "@/public/model/api";
import { ResObject } from "@/public/model/base";
import { ChinaJson } from "./model";

/**
 * api
 */
export const API_CHINA_JSON: Api = {
  title: "中国地图数据",
  path: "static/china_json.json",
  method: "STATIC",
  prefix: "",
};

// req

// res
export type ResChinaJson = ResObject<ChinaJson>;
