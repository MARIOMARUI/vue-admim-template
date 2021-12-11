/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// lib
// config
// script & methods & public
// http
// service
import {
  simplePageService,
  simpleObjectService,
  simpleBooleanService,
} from "@/public/service/simple.service";
import store from "@/store";
// api
import {
  ReqPermissionPage,
  ResPermissionPage,
  API_PERMISSION_PAGE,
  ReqPermissionAdd,
  API_PERMISSION_ADD,
  ResPermissionAdd,
  API_PERMISSION_UPDATE,
  ReqPermissionUpdate,
  ResPermissionUpdate,
  API_PERMISSION_DEL,
  ReqPermissionDel,
  ResPermissionDel,
} from "./api";
// interface && type && class
import { Permission } from "./model";
// 其它

// 权限分页
export async function getPermissionPageService(params: ReqPermissionPage) {
  return simplePageService<ReqPermissionPage, ResPermissionPage, Permission>(
    API_PERMISSION_PAGE,
    params,
  );
}

// 权限列表
export async function getPermissionListService(params: any) {
  const data = await simplePageService<ReqPermissionPage, ResPermissionPage, Permission>(
    API_PERMISSION_PAGE,
    params,
  );
  if (data.payload) {
    store.commit("SET_PERM_LIST", data.payload.list);
  }
  return data;
}

// 权限添加
export async function addPermissionService(params: ReqPermissionAdd) {
  return simpleObjectService<ReqPermissionAdd, ResPermissionAdd, Permission>(
    API_PERMISSION_ADD,
    params,
  );
}

// 权限编辑
export async function updatePermissionService(params: ReqPermissionUpdate) {
  return simpleObjectService<ReqPermissionUpdate, ResPermissionUpdate, Permission>(
    API_PERMISSION_UPDATE,
    params,
  );
}

// 权限删除
export async function delPermissionService(id: string) {
  return simpleBooleanService<ReqPermissionDel, ResPermissionDel>(API_PERMISSION_DEL, {
    id,
  });
}
