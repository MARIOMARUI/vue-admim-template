/**
 * @Date 2021-02-22 11:23:46
 * @Remark
 */

import { Api } from "@/public/model/api";
import { ResObject } from "@/public/model/base";
import { AreaMap } from "./model";

/**
 * api
 */
export const API_AREA_DATA: Api = {
  title: "静态数据-地区",
  path: "static/area.json",
  method: "STATIC",
  prefix: "",
};

// req

// res
export type ResAreaData = ResObject<AreaMap>;
