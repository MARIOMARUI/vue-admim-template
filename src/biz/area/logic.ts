/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/**
 * @Date 2021-02-22 14:21:06
 * @Remark
 */

// lib
// config
// script & methods & public
// biz
// store
// service
// interface && type
import { AreaMap } from "./model";
import { CascaderOption } from "element-ui/types/cascader";
// import _ from "lodash";
// 其它

export function formatDataToCascaderOption(areaMap?: AreaMap): CascaderOption[] {
  if (!areaMap) {
    return [];
  }

  const p: CascaderOption[] = [];
  for (const key in areaMap.province_list) {
    const element = areaMap.province_list[key];
    const result: CascaderOption = {
      value: key,
      label: element,
      children: [],
    };
    p.push(result);
  }
  const c: CascaderOption[] = [];
  for (const key in areaMap.city_list) {
    const element = areaMap.city_list[key];
    const result: CascaderOption = {
      value: key,
      label: element,
      children: [],
    };
    c.push(result);
  }
  const d: CascaderOption[] = [];
  for (const key in areaMap.county_list) {
    const element = areaMap.county_list[key];
    const result: CascaderOption = {
      value: key,
      label: element,
    };
    d.push(result);
  }
  c.forEach((el) => {
    const cityCode: string = el.value;
    // eslint-disable-next-line no-param-reassign
    el.children = d.filter((it) => {
      const code: string = it.value;
      const flag = code.slice(0, 4);
      return flag === cityCode.slice(0, 4);
    });
  });
  p.forEach((el) => {
    const provinceCode: string = el.value;
    // eslint-disable-next-line no-param-reassign
    el.children = c.filter((it) => {
      const code: string = it.value;
      const flag = code.slice(0, 2);
      return flag === provinceCode.slice(0, 2);
    });
  });
  return p;
}
