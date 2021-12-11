/**
 * @Date 2021-11-29 10:03:40
 * @Remark  部门管理列表
 */

import { Api } from "@/public/model/api";
import { ReqPage, ResBoolean, ResObject, ResPage, ResList } from "@/public/model/base";
import { CompanyDepartmentItem, ChildrenListItem } from "./model";

/**
 * api
 */
export const API_COMPANYDEPARTMENT_PAGE: Api = {
  title: "部门管理分页",
  path: "dept/list_dept",
  method: "POST",
  prefix: "api/backstage",
  remark: "部门管理CompanyDepartment操作接口",
};

// req
export interface ReqCompanyDepartmentPage extends ReqPage {
  keyword?: string;
}

// res
export type ResCompanyDepartmentPage = ResPage<CompanyDepartmentItem>;

/**
 * api
 */
export const API_COMPANYDEPARTMENT_ADD: Api = {
  title: "添加部门管理",
  path: "dept/add",
  method: "POST",
  prefix: "api/backstage",
  remark: "部门管理CompanyDepartment操作接口",
};

// req
export interface ReqCompanyDepartmentAdd {
  id?: string;

  deptName: string;
  companyId: string;
  deptPId: string;
}

// res
export type ResCompanyDepartmentAdd = ResObject<CompanyDepartmentItem>;

/**
 * api
 *
 */
export const API_COMPANYDEPARTMENT_UPDATE: Api = {
  title: "编辑部门管理",
  path: "dept/update",
  method: "POST",
  prefix: "api/backstage",
  remark: "部门管理CompanyDepartment操作接口",
};

// req
export interface ReqCompanyDepartmentUpdate extends ReqCompanyDepartmentAdd {}

// res
export type ResCompanyDepartmentUpdate = ResObject<CompanyDepartmentItem>;

/**
 * api
 */
export const API_COMPANYDEPARTMENT_DEL: Api = {
  title: "删除部门管理",
  path: "dept/delete",
  method: "POST",
  prefix: "api/backstage",
  remark: "部门管理CompanyDepartment操作接口",
};

// req
export interface ReqCompanyDepartmentDel {
  id: string;
}

// res
export type ResCompanyDepartmentDel = ResBoolean;
/**
 * api
 */
export const API_CHILDREN_LIST: Api = {
  title: "二级部门",
  path: "dept/list_c_dept",
  method: "POST",
  prefix: "api/backstage",
  remark: "部门管理CompanyDepartment操作接口",
};

// req
export interface ReqChildrenList {
  deptPId: string;
}

// res
export type ResChildrenList = ResList<ChildrenListItem>;
