/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// lib
import { Notification } from "element-ui";
// config & script & public
// 其它

function info(title: string, message: string) {
  Notification.info({
    title,
    message,
    // duration: 0,
  });
}

function error(title: string, message: string) {
  Notification.error({
    title,
    message,
  });
}

export default {
  info,
  error,
};
