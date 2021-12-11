/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

import { Api } from "@/public/model/api";
import { ReqByStrId, ReqPage, ResBoolean, ResObject, ResPage } from "@/public/model/base";
import { Permission } from "./model";

/**
 * api
 */
export const API_PERMISSION_PAGE: Api = {
  title: "权限分页",
  path: "permission/list",
  method: "POST",
  prefix: "api/backstage",
  remark: "权限permission操作接口",
};

// req
export interface ReqPermissionPage extends ReqPage {
  sysPermCode?: string;
  sysPermName?: string;
}

// res
export type ResPermissionPage = ResPage<Permission>;

/**
 * api
 */
export const API_PERMISSION_ADD: Api = {
  title: "添加权限",
  path: "permission/add",
  method: "POST",
  prefix: "api/backstage",
  remark: "权限permission操作接口",
};

// req
export interface ReqPermissionAdd {
  sysPermCode: string;
  sysPermDescription: string;
  sysPermName: string;
  sysPermUrl: string;
}

// res
export type ResPermissionAdd = ResObject<Permission>;

/**
 * api
 */
export const API_PERMISSION_UPDATE: Api = {
  title: "编辑权限",
  path: "permission/update",
  method: "POST",
  prefix: "api/backstage",
  remark: "权限permission操作接口",
};

// req
export interface ReqPermissionUpdate extends ReqByStrId, ReqPermissionAdd {}

// res
export type ResPermissionUpdate = ResObject<Permission>;

/**
 * api
 */
export const API_PERMISSION_DEL: Api = {
  title: "删除权限",
  path: "permission/delete",
  method: "POST",
  prefix: "api/backstage",
  remark: "权限permission操作接口",
};

// req
export type ReqPermissionDel = ReqByStrId;

// res
export type ResPermissionDel = ResBoolean;
