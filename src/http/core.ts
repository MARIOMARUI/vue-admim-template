/**
 * @Date 2019-11-14 14:49:49
 * @Remark
 */

// axios
import axios, { AxiosInstance } from "axios";
// lib
import queryString from "query-string";
import _ from "lodash";
// config
import { TIMEOUT } from "@/config/setting";
import { APP_DOMAIN } from "@/config/env";
// script & public
import { getToken } from "@/public/logic/token";
import logUtils from "@/utils/logUtils";
// store
// interface && type && class
import { Api } from "@/public/model/api";
// 其它

/**
 * 打印接口信息
 */
export function show(api: Api, url: string, payload: any) {
  const token = getToken();
  const msg = `api: ${api.title} || ${api.controller || api.remark || "无说明"} || method: ${
    api.method
  } || url: ${url} || params: ${JSON.stringify(payload)} || token: ${token.slice(0, 5)}...`;
  logUtils.info("req", msg);
}

// 生成url
export function createApiUrl(api: Api): string {
  // 静态资源
  if (api.method === "STATIC") {
    return `/${api.path}`;
  }
  // api
  if (api.prefix !== "") {
    return `${APP_DOMAIN.api}/${api.prefix}/${api.path}`;
  }
  // 无前缀
  const url = `${APP_DOMAIN.api}/${api.path}`;
  return url;
}

/**
 * axios实例获得超时配置
 * @param long 获得默认配置或自定义
 */
export function getTimeout(long?: boolean | number) {
  let timeout = TIMEOUT.SHORT;
  if (typeof long === "boolean") {
    timeout = TIMEOUT.LONG;
  }
  if (typeof long === "number") {
    timeout = long;
  }
  return timeout;
}

/**
 * axios实例创造方法
 */
export function createInstance(long: boolean | number = TIMEOUT.SHORT): AxiosInstance {
  // 创建和返回
  const newInstance: AxiosInstance = axios.create({
    timeout: getTimeout(long),
  });
  return newInstance;
}

/**
 * get请求格式化参数
 */
export function setUrlWithParams(url: string, data: any, fresh?: boolean): string {
  const timestamps = new Date().getTime();
  let link = url;
  if (data && !_.isEmpty(data)) {
    const formatData = queryString.stringify(data);
    link = `${url}?${formatData}`;
    if (fresh) {
      link = `${link}&v=${timestamps}`;
    }
    return link;
  }
  if (fresh) {
    link = `${url}?v=${timestamps}`;
  }
  return link;
}
