/**
 * @Date 2021-01-15 17:01:52
 * @Remark
 */

// lib
import { Message } from "element-ui";
// config & script & public
import { whenFailOrError } from "./method";
// interface && type && class
// 其它

function info(text: string) {
  Message.info(text);
}

function success(text: string) {
  Message.success(text);
}

function warn(text: string) {
  Message.warning(text);
}

function error(text: string) {
  Message.error(text);
}

export default {
  info,
  success,
  warn,
  error,
  whenFailOrError,
};
