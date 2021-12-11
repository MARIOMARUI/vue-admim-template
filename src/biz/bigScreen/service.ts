/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// lib
// config
// script & methods & public

// http
import { open } from "@/http/api";
// service
// api
import {
  ResChinaJson,
  API_CHINA_JSON,
} from "./api";
// interface && type && class

// 其它

// 获取中国geojson
export async function getChinaJsonService() {
  // 打开接口
  const a1 = await open<{}, ResChinaJson>(API_CHINA_JSON, {});
  return a1;
}
