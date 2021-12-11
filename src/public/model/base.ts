/**
 * @Date 2021-01-15 11:12:04
 * @Remark
 */

import { Res } from "./api";

/**
 * req
 */
export interface ReqById {
  id: any;
}

export interface ReqByStrId {
  id: string;
}

export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

export interface ReqUpload {
  uploadName?: string; // 表单字段名
  uploadFile: File; // 上传文件
  uploadFileName?: string; // 上传文件名
}

/**
 * res
 */
export type ResSimple = Res;

export interface ResPage<D> extends Res {
  data: {
    list: null | D[];
    pageCount: number;
    pageNum: number;
    total: number;
  };
}

export interface ResList<D> extends Res {
  data: null | D[];
}

export interface ResObject<D> extends Res {
  data: D;
}

export interface ResBoolean extends Res {
  data: boolean;
}

/**
 * service
 */
export interface PageData<T> {
  total: number;
  list: T[];
}

/**
 * controller / logic
 */

// 列表
export interface ListTable<T> {
  loading: boolean;
  total: number;
  list: T[];
}

// 分页
export interface PageTable<T> extends ListTable<T> {
  page: number;
  size: number;
}

// 常用结构
export interface StrCodeMap<T> {
  [code: string]: T;
}

export interface NumCodeMap<T> {
  [code: number]: T;
}

export type StrMap = StrCodeMap<string>;
