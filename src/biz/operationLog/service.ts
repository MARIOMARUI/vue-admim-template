/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// lib
// config
// script & methods & public
// http
// state
// service
import {
  simplePageService,
  simpleObjectService,
  simpleBooleanService,
} from "@/public/service/simple.service";
// api
import {
  ReqOperationLogPage,
  ResOperationLogPage,
  API_OPERATIONLOG_PAGE,
  ReqOperationLogAdd,
  API_OPERATIONLOG_ADD,
  ResOperationLogAdd,
  API_OPERATIONLOG_UPDATE,
  ReqOperationLogUpdate,
  ResOperationLogUpdate,
  API_OPERATIONLOG_DEL,
  ReqOperationLogDel,
  ResOperationLogDel,
} from "./api";
// interface && type && class
import { OperationLog } from "./model";
// 其它

// 操作日志分页
export async function getOperationLogPageService(params: ReqOperationLogPage) {
  return simplePageService<ReqOperationLogPage, ResOperationLogPage, OperationLog>(
    API_OPERATIONLOG_PAGE,
    params,
  );
}

// 操作日志添加
export async function addOperationLogService(params: ReqOperationLogAdd) {
  return simpleObjectService<ReqOperationLogAdd, ResOperationLogAdd, OperationLog>(
    API_OPERATIONLOG_ADD,
    params,
  );
}

// 操作日志编辑
export async function updateOperationLogService(params: ReqOperationLogUpdate) {
  return simpleObjectService<ReqOperationLogUpdate, ResOperationLogUpdate, OperationLog>(
    API_OPERATIONLOG_UPDATE,
    params,
  );
}

// 操作日志删除
export async function delOperationLogService(id: string) {
  return simpleBooleanService<ReqOperationLogDel, ResOperationLogDel>(API_OPERATIONLOG_DEL, {
    id,
  });
}
