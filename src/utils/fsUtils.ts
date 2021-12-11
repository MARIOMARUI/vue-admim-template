/**
 * @Date 2021-11-29 10:03:40
 * @Remark https://github.com/yiminghe/async-validator的验证规则
 */

import message from "@/components/Notice/message";
import { UPLOAD } from "@/config/setting";
import { FileListItem } from "element-ui/types/upload";

/**
 * 文件类型
 */
export type FileType = "image" | "video" | "excel" | "office" | "pdf" | "compression" | "all";

function checkFileSize(size: number, maxSize: number) {
  return size / 1024 / 1024 < maxSize;
}

function getFileType(name: string) {
  const startIndex = name.lastIndexOf(".");
  if (startIndex !== -1) {
    return name.slice(startIndex + 1).toLowerCase();
  }
  return undefined;
}

function getFileTypeDetail(params: FileType) {
  switch (params) {
    case "image":
      return ["png", "jpg", "jpeg"];
    case "video":
      return ["mp4", "flv"];
    case "excel":
      return ["xls", "xlsx"];
    case "office":
      return ["doc", "docx", "xls", "xlsx"];
    case "pdf":
      return ["pdf"];
    case "compression":
      return ["zip", "rar"];
    default:
      return [];
  }
}

function getFileTypeDetailList(list: FileType[]) {
  let result = getFileTypeDetail("all");
  list.forEach((el) => {
    result = result.concat(getFileTypeDetail(el));
  });
  return result;
}

/**
 * 获得文件最大限制
 */

function getFileCheckSize(params: FileType) {
  switch (params) {
    case "image":
      return UPLOAD.IMAGE_MAX_SIZE;
    case "video":
      return UPLOAD.VIDEO_MAX_SIZE;
    case "excel":
      return UPLOAD.OFFICE_MAX_SIZE;
    case "office":
      return UPLOAD.OFFICE_MAX_SIZE;
    case "pdf":
      return UPLOAD.PDF_MAX_SIZE;
    case "compression":
      return UPLOAD.COMPRESSION_MAX_SIZE;
    default:
      return UPLOAD.ALL_MAX_SIZE;
  }
}

function getFileMaxSize(list: FileType[]) {
  let result = 0;
  list.forEach((el) => {
    const size = getFileCheckSize(el);
    if (result < size) {
      result = size;
    }
  });
  if (result === 0) {
    result = UPLOAD.ALL_MAX_SIZE;
  }
  return result;
}

function getAcceptStr(list: FileType[]) {
  let result = getFileTypeDetail("all");
  list.forEach((el) => {
    result = result.concat(getFileTypeDetail(el));
  });
  return result.map((el) => `.${el}`).join(",");
}

function limit(file: File, types: FileType[], alert = true) {
  const suffix = getFileType(file.name);
  if (!suffix) {
    if (alert) {
      message.warn("无法识别文件的类型");
    }
    return false;
  }
  // 需要检查的检查类型
  const typeList = getFileTypeDetailList(types);
  if (typeList.length > 0 && typeList.indexOf(suffix) === -1) {
    if (alert) {
      message.warn("不能上传该类型的文件");
    }
    return false;
  }
  const maxSize = getFileMaxSize(types);
  const sizeCheck = checkFileSize(file.size, maxSize);
  if (!sizeCheck && alert) {
    message.warn(`图片必须小于${maxSize}MB`);
  }
  return sizeCheck;
}

/**
 * 从url获得文件名
 * 从一个url,如http://171.221.254.38:59000/water/564860150823534592.doc,获得最后的文件名
 */
function getFileNameFormUrl(url: string) {
  const arr = url.split("/");
  return arr[arr.length - 1];
}

/**
 * 从一个多文件字符串(逗号隔开)或字符串数组创造对应的el上传文件列表
 */
function getFileList(params?: string | string[]) {
  if (!params) {
    return [];
  }
  const list = Array.isArray(params) ? params : params.split(",");
  const result = list.map((el) => {
    const item: FileListItem = {
      name: getFileNameFormUrl(el),
      url: el,
    };
    return item;
  });
  return result;
}

export default {
  limit,
  getAcceptStr,
  getFileNameFormUrl,
  getFileMaxSize,
  getFileList,
};
