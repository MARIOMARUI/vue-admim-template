/**
 * @Date 2021-02-22 11:33:51
 * @Remark 地区数据,来自https://github.com/youzan/vant/blob/dev/src/area/demo/area.js
 */

import { StrMap } from "@/public/model/base";

export interface AreaMap {
  province_list: StrMap;
  city_list: StrMap;
  county_list: StrMap;
}
