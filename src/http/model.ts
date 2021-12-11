/**
 * @Date 2019-11-27 17:12:36
 * @Remark
 */

import { AxiosResponse } from "axios";

// 返回数据包
export interface BagData<T> {
  fail: string;
  err: string;
  payload: T | null; // 最后返回和处理过的数据容器
}

export const BLANK_RESPONSE: AxiosResponse<null> = {
  data: null,
  status: 999,
  statusText: "",
  headers: {},
  config: {},
};

export interface OpenOption {
  long?: boolean | number; // 布尔是默认设置, 数字是特殊设置
  fresh?: boolean;
}

export const openOption: OpenOption = {
  long: false,
  fresh: false,
};

export const RESULT_NOT_LOGIN = -1; // 没有登录
export const RESULT_SUCCESS = 1999; // 成功返回
export const RESULT_FAIL = -4; // 业务异常,包括微服务错误也是,后端不区分前端也不区分了,随便

// http错误code对应信息
export interface HttpErrorCodeMap {
  [code: number]: string;
}
export const HTTP_ERROR_CODE_MAP: HttpErrorCodeMap = {
  // 自定义
  999: "网络出现问题或服务端无响应",
  998: "无上传文件",
  // 标准
  403: "访问被禁止",
  404: "资源不存在",
  405: "不允许此请求方法",
  406: "请求格式不可得",
  415: "服务器不支持参数格式",
  500: "服务器发生错误",
  502: "网关错误",
  503: "服务暂时不可用",
  504: "网关超时",
};
