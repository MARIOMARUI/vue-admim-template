/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

import { Api, Res } from "@/public/model/api";

export const API_FILE_UPLOAD: Api = {
  title: "文件上传",
  path: "file/upload",
  method: "UPLOAD",
  prefix: "api/communal",
};

// req
// 默认参数名file

// res
export interface ResFileUpload extends Res {
  data: {
    fileName2Uri: ItemFileUpload[];
  };
}

export type ItemFileUpload = string;
