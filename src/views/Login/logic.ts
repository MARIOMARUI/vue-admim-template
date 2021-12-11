/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// lib
import moment from "moment";
// config
// script & methods & public
import timeUtils from "@/utils/timeUtils";
// store
// service
// interface && type && class
// 其它

export function createCopyRight() {
  const begin = timeUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss ");
  const end = timeUtils.format(moment(begin).add(10, "y"), "yyyy-MM-dd HH:mm:ss ");

  return `Copyright © ${begin} - ${end}`;
}
