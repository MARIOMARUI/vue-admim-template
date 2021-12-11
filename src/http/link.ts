/**
 * @Date 2019-11-27 17:06:13
 * @Remark
 */

// lib
import _ from "lodash";
// axios
import { AxiosError, AxiosResponse } from "axios";
// config & script & public
import logUtils from "@/utils/logUtils";
import { getToken } from "@/public/logic/token";
// http
import { setUrlWithParams, createInstance, getTimeout } from "./core";
// model
import { BLANK_RESPONSE, HTTP_ERROR_CODE_MAP, OpenOption } from "./model";
import { Res } from "@/public/model/api";
// 其它

const axiosInstance = createInstance();

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    const mConfig = config;
    if (token !== "") {
      mConfig.headers = {
        authorization: token,
      };
    }
    return mConfig;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error),
);

export function successAction<D extends Res>(res: AxiosResponse<D>, url: string) {
  // 打印结果
  logUtils.info("res", `method: POST || url: ${url}`);
  logUtils.log(JSON.parse(JSON.stringify(res.data)));
  return res.data;
}

export function errorAction(error: AxiosError, url: string) {
  const res: AxiosResponse<null> = error.response || BLANK_RESPONSE;
  // 打印结果
  logUtils.info("res", `method: POST || url: ${url}`);
  logUtils.log(res.data);
  const result: Res = {
    result: res.status,
    message: "http error",
  };
  return result;
}

/**
 * get方法
 * @param url
 * @param payload
 * @param option
 */
function get<T, D extends Res>(url: string, payload: T, option: OpenOption): Promise<D | Res> {
  axiosInstance.defaults.timeout = getTimeout(option.long);
  // 请求路径添加处理参数
  const path: string = setUrlWithParams(url, payload, option.fresh);
  // 请求实例
  return axiosInstance
    .get(path)
    .then((res: AxiosResponse<D>) => successAction(res, url))
    .catch((error: AxiosError) => errorAction(error, url));
}

/**
 * POST方法
 * @param url
 * @param payload
 * @param option
 */
function post<T, D extends Res>(url: string, payload: T, option: OpenOption): Promise<D | Res> {
  axiosInstance.defaults.timeout = getTimeout(option.long);
  // 请求实例
  return axiosInstance
    .post(url, payload)
    .then((res: AxiosResponse<D>) => successAction(res, url))
    .catch((error: AxiosError) => errorAction(error, url));
}

/**
 * 上传
 * https://www.cnblogs.com/cjh1111/p/7017295.html
 */
async function upload<T, D extends Res>(
  url: string,
  payload: T,
  option: OpenOption,
): Promise<D | Res> {
  const mPayload: any = payload;
  if (!mPayload.uploadFile) {
    return {
      result: 998,
      message: HTTP_ERROR_CODE_MAP[998],
    };
  }
  const uploadFile: File = mPayload.uploadFile;
  axiosInstance.defaults.timeout = getTimeout(option.long);
  // 创建form对象
  const form: FormData = new FormData();
  // 通过append向form对象添加数据,默认文件名file
  form.append(
    mPayload.uploadName || "file",
    uploadFile,
    mPayload.uploadFileName || uploadFile.name,
  );
  // 循环添加参数  不能使用forEach
  _.forIn(mPayload, (val: any, key) => {
    if (key !== "uploadName" && key !== "uploadFile" && key !== "uploadFileName") {
      form.append(key, val);
    }
  });
  // 请求实例
  return axiosInstance
    .post(url, form, {
      headers: {
        // 添加请求头,表单格式
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res: AxiosResponse<D>) => successAction(res, url))
    .catch((error: AxiosError) => errorAction(error, url));
}

export default {
  get,
  post,
  upload,
};
