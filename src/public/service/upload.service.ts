/**
 * @Date 2021-01-19 16:47:11
 * @Remark 配套element-ui上传组件写的 https://www.cnblogs.com/cjh1111/p/7017295.html
 */

// lib
import { AxiosError } from "axios";
// config
// script & methods & public
import { getToken } from "@/public/logic/token";
import { createInstance, createApiUrl } from "@/http/core";
import { HTTP_ERROR_CODE_MAP } from "@/http/model";
import logUtils from "@/utils/logUtils";
// biz
// store
// api
import { API_FILE_UPLOAD, ResFileUpload } from "@/biz/file/api";
// interface && type
import { HttpRequestOptions } from "element-ui/types/upload";
import { isErrRes, isFailRes, isOkRes } from "@/http/api";
import { Res } from "../model/api";
// 其它

function getErrorMessage(error: AxiosError): string {
  if (!error.response) {
    return "上传错误";
  }
  const res = error.response;
  if (!res.data) {
    return res.statusText || HTTP_ERROR_CODE_MAP[res.status];
  }
  const errData = res.data;
  return `${errData.status} ${errData.error}`;
}

function getErrorEvent(msg: string): ErrorEvent {
  const err = new ErrorEvent(msg);
  return err;
}

function uploadRequest() {
  //
}

/**
 * elemnet-UI上传组件的自定义上传逻辑
 * @param options 上传配置项
 * TODO: token验证好像没有?
 */
function eleUploadRequest(options: HttpRequestOptions) {
  const instance = createInstance(true);
  const url = createApiUrl(API_FILE_UPLOAD);
  // 添加文件
  const formData = new FormData();
  formData.append(options.filename, options.file, options.file.name);
  // 上传
  instance
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: getToken(),
      },
    })
    .then((res) => {
      logUtils.info("上传返回", res);
      const resData: ResFileUpload | Res = res.data;
      if (isOkRes(resData)) {
        options.onSuccess(resData.data.fileName2Uri);
      } else if (isFailRes(resData) || isErrRes(resData)) {
        options.onError(getErrorEvent(resData.message));
      } else {
        const msg = "未知上传错误";
        options.onError(getErrorEvent(msg));
      }
    })
    .catch((error: AxiosError) => {
      // 打印结果
      logUtils.error("上传错误", error);
      const msg = getErrorMessage(error);
      options.onError(getErrorEvent(msg));
    });
}

export default {
  uploadRequest,
  eleUploadRequest,
};
