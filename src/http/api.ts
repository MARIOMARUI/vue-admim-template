/**
 * @Date 2019-11-27 17:11:36
 * @Remark
 */

// lib
import { MessageBox } from "element-ui";
// config
// script & methods & public
import message from "@/components/Notice/message";
// store
// http
import { Api, Res } from "@/public/model/api";
import {
  OpenOption,
  openOption,
  HTTP_ERROR_CODE_MAP,
  RESULT_NOT_LOGIN,
  RESULT_SUCCESS,
  BagData,
} from "./model";
import { createApiUrl, show } from "./core";
import link from "./link";
// interface && type
// 其它
import { logoutService } from "@/biz/authorize/service";

// 成功返回
export function isOkRes<T extends Res>(test: T | Res): test is T {
  const code = test.result.toString();
  return code === RESULT_SUCCESS.toString();
}

// 失败返回
export function isFailRes<T extends Res>(test: T | Res): test is Res {
  const code = test.result.toString();
  return code !== RESULT_SUCCESS.toString() && code.length !== 3;
}

// 错误返回
export function isErrRes<T extends Res>(test: T | Res): test is Res {
  const code = test.result.toString();
  return code !== RESULT_SUCCESS.toString() && code.length === 3;
}

/**
 * 打开接口
 */

// 单个使用
// const a1 = await open<{}, ResOrderList>(apiOrderList, {});

// 串联使用
// const req1 = open<{}, ResOrderList>(apiOrderList, {});
// const req2 = open<{}, ResOrderList>(apiOrderList, {});
// const a1 = await req1;
// const a2 = await req2;
export function open<T, D extends Res>(api: Api, payload: T, option: OpenOption = openOption) {
  // 设置url
  const url = createApiUrl(api);
  // 打印请求信息
  show(api, url, payload);
  // 根据api信息确定请求格式
  if (api.method === "POST") {
    return link.post<T, D>(url, payload, option);
  }
  if (api.method === "UPLOAD") {
    return link.upload<T, D>(url, payload, option);
  }
  // 默认用get方式
  return link.get<T, D>(url, payload, option);
}

/**
 * 创建一个Data的结构
 */
let waitFlag = true;
export function bag<T>(res: Res | Res[], alert = true): BagData<T> {
  const data: BagData<T> = {
    fail: "",
    err: "",
    payload: null,
  };
  let resArr: Res[] = [];
  if (Array.isArray(res)) {
    resArr = res;
  } else {
    resArr = [res];
  }
  resArr.forEach((el: Res) => {
    // 没有登录
    if (el.result === RESULT_NOT_LOGIN) {
      if (waitFlag) {
        waitFlag = false;
        MessageBox.confirm("登录凭据失效，可以取消后留在该页面，或重新登录", "需要重新登录", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(() => {
            logoutService(200).then((result) => {
              if (result) {
                waitFlag = true;
              }
            });
          })
          .catch(() => {
            waitFlag = true;
          });
      }
    } else {
      // 错误返回
      if (isErrRes(el)) {
        const code = el.result;
        // 有data错误信息就返回data,错误信息,没有就返回http默认信息
        if (el.data) {
          data.err = JSON.stringify(el.data);
        } else {
          data.err = HTTP_ERROR_CODE_MAP[code];
        }
      }
      // 失败返回
      if (isFailRes(el)) {
        data.fail = el.message || "未知操作失败";
      }
    }
  });
  if (alert) {
    message.whenFailOrError(data);
  }
  // 返回
  return data;
}

export default {
  open,
  bag,
  isOkRes,
  isFailRes,
  isErrRes,
};
