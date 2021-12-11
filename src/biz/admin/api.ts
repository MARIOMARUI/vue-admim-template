/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

import { Api } from "@/public/model/api";
import { ReqById, ReqPage, ResBoolean, ResList, ResObject, ResPage } from "@/public/model/base";
import { Role } from "../role/model";
import { Admin, AdminAllocableCelllist, AllocableCelllist, Companylist } from "./model";

/**
 * api
 */
export const API_ADMIN_PAGE: Api = {
  title: "管理员分页",
  path: "user/list",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqAdminPage extends ReqPage {
  sysUserName?: string;
}

// res
export type ResAdminPage = ResPage<Admin>;

/**
 * api
 */
export const API_ADMIN_ADD: Api = {
  title: "添加管理员",
  path: "user/add",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqAdminAdd {
  sysUserName: string;
  sysUserPass: string;
}

// res
export type ResAdminAdd = ResObject<Admin>;

/**
 * api
 */
export const API_ADMIN_UPDATE: Api = {
  title: "编辑管理员",
  path: "user/update",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqAdminUpdate extends ReqById, ReqAdminAdd { }

// res
export type ResAdminUpdate = ResObject<Admin>;

/**
 * api
 */
export const API_ADMIN_DEL: Api = {
  title: "删除管理员",
  path: "user/delete",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqAdminDel {
  sysUserId: string;
}

// res
export type ResAdminDel = ResBoolean;

/**
 * api
 */
export const API_ADMIN_ROLE_LIST: Api = {
  title: "管理员角色列表",
  path: "user/role_list",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqAdminRoleList {
  sysUserId: string;
}

// res
export type ResAdminRoleList = ResList<Role>;

/**
 * api
 */
export const API_ADMIN_ROLE_ADD: Api = {
  title: "管理员关联角色",
  path: "user/save_user2role",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqAdminRoleAdd {
  sysUserId: string;
  roleId: string;
}

// res
export type ResAdminRoleAdd = ResBoolean;

/**
 * api
 */
export const API_ADMIN_ROLE_DEL: Api = {
  title: "删除用户关联角色",
  path: "user/delete_user2role",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqAdminRoleDel {
  sysUserId: string;
  roleId: string;
}

// res
export type ResAdminRoleDel = ResBoolean;

/**
 * api
 */
export const API_COMPANY_LIST: Api = {
  title: "公司下拉",
  path: "company/list_all",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqCompanylist {
  sysUserId: string;
  roleId: string;
}

// res
export type ResCompanylist = ResList<Companylist>;

/**
 * api
 */
export const API_DEPARTMENTLIST_LIST: Api = {
  title: "部门下拉",
  path: "dept/list_all",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqDepartmentlist {
  sysUserId: string;
  roleId: string;
}

// res
export type ResDepartmentlist = ResList<Companylist>;
/**
 * api
 */
export const API_ADMIN_ALLOCABLE_CELL_LIST: Api = {
  title: "当前管理员的已有小区",
  path: "user/list_user_min_area",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqAdminAllocableCelllist {
  id?: string;
}

// res
export type ResAdminAllocableCelllist = ResList<AdminAllocableCelllist>;
/**
 * api
 */
export const API_ALLOCABLE_CELL_LIST: Api = {
  title: "所有可分配小区",
  path: "user/list_min_area",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqAllocableCelllist {
  id?: string;
}

// res
export type ResAllocableCelllist = ResList<AllocableCelllist>;
/**
 * api
 */
export const API_EDIT_ADMIN_VILLAGE: Api = {
  title: "分配小区",
  path: "user/save_user_min_area",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqeditAdminVillage {
  minAreaBizId: string[];
  sysUserId: string;
}

// res
export type ReseditAdminVillage = ResBoolean;
/**
 * api
 */
export const API_EDIT_ADMIN_VILLAGE_DEL: Api = {
  title: "删除小区",
  path: "user/delete_user_min_area",
  method: "POST",
  prefix: "api/backstage",
  remark: "用户user操作接口",
};

// req
export interface ReqeditAdminVillageDel {
  minAreaBizId: string[];
  sysUserId: string;
}

// res
export type ReseditAdminVillageDel = ResBoolean;
