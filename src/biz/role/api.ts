/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

import { Api, Res } from "@/public/model/api";
import { ReqByStrId, ReqPage, ResBoolean, ResObject, ResPage } from "@/public/model/base";
import { Role, RoleDetail } from "./model";

/**
 * api
 */
export const API_ROLE_PAGE: Api = {
  title: "角色分页",
  path: "role/list",
  method: "POST",
  prefix: "api/backstage",
  remark: "角色role操作接口",
};

// req
export interface ReqRolePage extends ReqPage {
  sysRoleCode?: string;
  sysRoleName?: string;
}

// res
export type ResRolePage = ResPage<Role>;

/**
 * api
 */
export const API_ROLE_ADD: Api = {
  title: "添加角色",
  path: "role/add",
  method: "POST",
  prefix: "api/backstage",
  remark: "角色role操作接口",
};

// req
export interface ReqRoleAdd {
  sysRoleCode: string;
  sysRoleName: string;
}

// res
export type ResRoleAdd = ResObject<Role>;

/**
 * api
 */
export const API_ROLE_UPDATE: Api = {
  title: "编辑角色",
  path: "role/update",
  method: "POST",
  prefix: "api/backstage",
  remark: "角色role操作接口",
};

// req
export interface ReqRoleUpdate extends ReqByStrId, ReqRoleAdd {}

// res
export type ResRoleUpdate = ResObject<Role>;

/**
 * api
 */
export const API_ROLE_DEL: Api = {
  title: "删除角色",
  path: "role/delete",
  method: "POST",
  prefix: "api/backstage",
  remark: "角色role操作接口",
};

// req
export type ReqRoleDel = ReqByStrId;

// res
export type ResRoleDel = ResBoolean;

/**
 * api
 */
export const API_ROLE_INFO: Api = {
  title: "获取角色信息",
  path: "role/get",
  method: "POST",
  prefix: "api/backstage",
  remark: "角色role操作接口",
};

// req
export interface ReqRoleInfo {
  roleId: string;
}

// res
export interface ResRoleInfo extends Res {
  data: RoleDetail;
}

/**
 * api
 */
export const API_ROLE_PERMISSION_ADD: Api = {
  title: "角色关联权限",
  path: "role/save_role2perm",
  method: "POST",
  prefix: "api/backstage",
  remark: "角色role操作接口",
};

// req
export interface ReqRolePermAdd {
  roleId: string;
  permId: string;
}

// res
export type ResRolePermAdd = ResBoolean;

/**
 * api
 */
export const API_ROLE_PERMISSION_DEL: Api = {
  title: "角色减少权限",
  path: "role/delete_role2perm",
  method: "POST",
  prefix: "api/backstage",
  remark: "角色role操作接口",
};

// req
export interface ReqRolePermDel {
  roleId: string;
  permId: string;
}

// res
export type ResRolePermDel = ResBoolean;

/**
 * api
 */
export const API_ROLE_MENU_ADD: Api = {
  title: "角色关联菜单",
  path: "role/save_role2menu",
  method: "POST",
  prefix: "api/backstage",
  remark: "角色role操作接口",
};

// req
export interface ReqRoleMenuAdd {
  roleId: string;
  menuId: string;
}

// res
export type ResRoleMenuAdd = ResBoolean;

/**
 * api
 */
export const API_ROLE_MENU_DEL: Api = {
  title: "角色减少菜单",
  path: "role/delete_role2menu",
  method: "POST",
  prefix: "api/backstage",
  remark: "角色role操作接口",
};

// req
export interface ReqRoleMenuDel {
  roleId: string;
  menuId: string;
}

// res
export type ResRoleMenuDel = ResBoolean;
