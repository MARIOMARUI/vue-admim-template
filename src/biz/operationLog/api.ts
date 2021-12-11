/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

import { Api } from "@/public/model/api";
import { ReqByStrId, ReqPage, ResBoolean, ResObject, ResPage } from "@/public/model/base";
import { OperationLog } from "./model";

/**
 * api
 */
export const API_OPERATIONLOG_PAGE: Api = {
  title: "操作日志分页",
  path: "admin_operation_journal/list",
  method: "POST",
  prefix: "api/backstage",
  remark: "操作日志OperationLog操作接口",
};

// req
export interface ReqOperationLogPage extends ReqPage {
  name?: string;
}

// res
export type ResOperationLogPage = ResPage<OperationLog>;

/**
 * api
 */
export const API_OPERATIONLOG_ADD: Api = {
  title: "添加操作日志",
  path: "admin_operation_journal/add",
  method: "POST",
  prefix: "api/backstage",
  remark: "操作日志OperationLog操作接口",
};

// req
export interface ReqOperationLogAdd {
  name?: string;
}

// res
export type ResOperationLogAdd = ResObject<OperationLog>;

/**
 * api
 */
export const API_OPERATIONLOG_UPDATE: Api = {
  title: "编辑操作日志",
  path: "admin_operation_journal/update",
  method: "POST",
  prefix: "api/backstage",
  remark: "操作日志OperationLog操作接口",
};

// req
export interface ReqOperationLogUpdate extends ReqByStrId, ReqOperationLogAdd {}

// res
export type ResOperationLogUpdate = ResObject<OperationLog>;

/**
 * api
 */
export const API_OPERATIONLOG_DEL: Api = {
  title: "删除操作日志",
  path: "admin_operation_journal/delete",
  method: "POST",
  prefix: "api/backstage",
  remark: "操作日志OperationLog操作接口",
};

// req
export type ReqOperationLogDel = ReqByStrId;

// res
export type ResOperationLogDel = ResBoolean;
