/*
 * @Descripttion:
 * @version:
 * @Author: marui
 * @Date: 2021-07-06 10:26:47
 * @LastEditTime: 2021-10-29 10:04:43
 */
/**
 * @Date 2019-12-06 18:18:14
 * @Remark
 */

// import dayjs from "dayjs";
import moment, { Moment } from "moment";

// 格式化时间
function format(
  time: Date | number | string | Moment | undefined = new Date(),
  pattern: string,
): string {
  if (moment.isMoment(time)) {
    return time.format(pattern);
  }
  // moment(time).format('YYYY-MM-DD HH:mm:ss')--------------24小时
  // moment(time).format('YYYY-MM-DD hh:mm:ss')--------------12小时
  return moment(time).format(pattern);
}

// 获得时间戳
function getUnixTime(time: Date | number = new Date()): number {
  return moment(time).unix();
}

export default {
  format,
  getUnixTime,
};
