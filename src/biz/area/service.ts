/**
 * @Date 2021-02-22 14:21:04
 * @Remark
 */

// lib
// config
// script & methods & public
// http
import { open, bag, isOkRes } from "@/http/api";
// state
import store from "@/store";
// api
import { API_AREA_DATA, ResAreaData } from "./api";
// interface && type && class
import { CascaderOption } from "element-ui/types/cascader";
// 其它
import { formatDataToCascaderOption } from "./logic";

// 获得地区数据
export async function getAreaDataService() {
  // 打开接口
  const a1 = await open<{}, ResAreaData>(API_AREA_DATA, {});
  // 创建返回数据
  const data = bag<CascaderOption[]>(a1);
  // 成功后处理
  if (isOkRes(a1)) {
    store.commit("SET_AREA_MAP", a1.data);
    data.payload = formatDataToCascaderOption(a1.data);
  }
  return data;
}

// 获得地区数据
export async function getAreaListService() {
  // 打开接口
  const a1 = await open<{}, ResAreaData>(API_AREA_DATA, {});
  return a1;
}
