/**
 * @Date 2021-11-30 09:28:42
 * @Remark
 */

// lib
// config & script & public
import message from "./message";
import notification from "./notification";
// http
// interface && type && class
import { BagData } from "@/http/model";
// 其它

export function whenFailOrError(result: BagData<any>) {
  if (result.fail !== "") {
    message.warn(result.fail);
    return false;
  }
  if (result.err !== "") {
    notification.error("HTTP ERROR", result.err);
    return false;
  }
  return true;
}
