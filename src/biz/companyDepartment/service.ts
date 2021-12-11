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
  simpleListService,
} from "@/public/service/simple.service";
// api
import {
  ReqCompanyDepartmentPage,
  ResCompanyDepartmentPage,
  API_COMPANYDEPARTMENT_PAGE,
  ReqCompanyDepartmentAdd,
  API_COMPANYDEPARTMENT_ADD,
  ResCompanyDepartmentAdd,
  API_COMPANYDEPARTMENT_UPDATE,
  ReqCompanyDepartmentUpdate,
  ResCompanyDepartmentUpdate,
  API_COMPANYDEPARTMENT_DEL,
  ReqCompanyDepartmentDel,
  ResCompanyDepartmentDel,
  API_CHILDREN_LIST,
  ReqChildrenList,
  ResChildrenList,
} from "./api";
// interface && type && class
import { CompanyDepartmentItem, ChildrenListItem } from "./model";
// 其它

// 部门管理分页
export async function getCompanyDepartmentPageService(params: ReqCompanyDepartmentPage) {
  return simplePageService<
    ReqCompanyDepartmentPage,
    ResCompanyDepartmentPage,
    CompanyDepartmentItem
  >(API_COMPANYDEPARTMENT_PAGE, params);
}

// 部门管理添加
export async function addCompanyDepartmentService(params: ReqCompanyDepartmentAdd) {
  return simpleObjectService<
    ReqCompanyDepartmentAdd,
    ResCompanyDepartmentAdd,
    CompanyDepartmentItem
  >(API_COMPANYDEPARTMENT_ADD, params);
}

// 部门管理编辑
export async function updateCompanyDepartmentService(params: ReqCompanyDepartmentUpdate) {
  return simpleObjectService<
    ReqCompanyDepartmentUpdate,
    ResCompanyDepartmentUpdate,
    CompanyDepartmentItem
  >(API_COMPANYDEPARTMENT_UPDATE, params);
}

// 部门管理删除
export async function delCompanyDepartmentService(params: ReqCompanyDepartmentDel) {
  return simpleBooleanService<ReqCompanyDepartmentDel, ResCompanyDepartmentDel>(
    API_COMPANYDEPARTMENT_DEL,
    params,
  );
}

// 部门二级
export async function getChildrenService(params: ReqChildrenList) {
  return simpleListService<ReqChildrenList, ResChildrenList, ChildrenListItem>(
    API_CHILDREN_LIST,
    params,
  );
}
