/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// lib
import _ from "lodash";
// config
// script & methods & public
import logUtils from "@/utils/logUtils";
// http
import { open, bag, isFailRes, isErrRes } from "@/http/api";
// service
import {
  simplePageService,
  simpleObjectService,
  simpleBooleanService,
  simpleListService,
} from "@/public/service/simple.service";
import { Role } from "../role/model";
// api
import {
  ReqAdminPage,
  ResAdminPage,
  API_ADMIN_PAGE,
  ReqAdminAdd,
  API_ADMIN_ADD,
  ResAdminAdd,
  API_ADMIN_UPDATE,
  ReqAdminUpdate,
  ResAdminUpdate,
  API_ADMIN_DEL,
  ReqAdminDel,
  ResAdminDel,
  API_ADMIN_ROLE_LIST,
  ReqAdminRoleList,
  ResAdminRoleList,
  ReqAdminRoleAdd,
  ResAdminRoleAdd,
  API_ADMIN_ROLE_ADD,
  ReqAdminRoleDel,
  ResAdminRoleDel,
  API_ADMIN_ROLE_DEL,
  ReqCompanylist,
  ResCompanylist,
  API_COMPANY_LIST,
  ResDepartmentlist,
  ReqDepartmentlist,
  API_DEPARTMENTLIST_LIST,
  ReqAllocableCelllist,
  ResAllocableCelllist,
  API_ALLOCABLE_CELL_LIST,
  API_EDIT_ADMIN_VILLAGE,
  ReqeditAdminVillage,
  ReseditAdminVillage,
  ReseditAdminVillageDel,
  ReqeditAdminVillageDel,
  API_EDIT_ADMIN_VILLAGE_DEL,
  ReqAdminAllocableCelllist,
  ResAdminAllocableCelllist,
  API_ADMIN_ALLOCABLE_CELL_LIST,
} from "./api";
// interface && type && class
import { Admin, AdminAllocableCelllist, AllocableCelllist, Companylist, Departmentlist } from "./model";
// 其它
import store from "@/store";

// 管理员分页
export async function getAdminPageService(params: ReqAdminPage) {
  return simplePageService<ReqAdminPage, ResAdminPage, Admin>(API_ADMIN_PAGE, params);
}

// 管理员添加
export async function addAdminService(params: ReqAdminAdd) {
  return simpleObjectService<ReqAdminAdd, ResAdminAdd, Admin>(API_ADMIN_ADD, params);
}

// 管理员编辑
export async function updateAdminService(params: ReqAdminUpdate) {
  return simpleObjectService<ReqAdminUpdate, ResAdminUpdate, Admin>(API_ADMIN_UPDATE, params);
}

// 管理员删除
export async function delAdminService(id: string) {
  return simpleBooleanService<ReqAdminDel, ResAdminDel>(API_ADMIN_DEL, {
    sysUserId: id,
  });
}

// 管理员角色列表
export async function getAdminRoleListService(id: string) {
  return simpleListService<ReqAdminRoleList, ResAdminRoleList, Role>(API_ADMIN_ROLE_LIST, {
    sysUserId: id,
  });
}

// 编辑管理员角色
export async function editAdminRoleService(id: string, selected: string[], have: string[]) {
  logUtils.log("id", id);
  logUtils.log("selected", selected);
  logUtils.log("have", have);
  const needAdd = _.difference(selected, have);
  const needDel = _.difference(have, selected);
  logUtils.info("编辑管理员角色", `角色增加${needAdd}`);
  logUtils.info("编辑管理员角色", `角色减少${needDel}`);
  // 打开接口
  const addApi = needAdd.map((el) => {
    return open<ReqAdminRoleAdd, ResAdminRoleAdd>(API_ADMIN_ROLE_ADD, {
      sysUserId: id,
      roleId: el,
    });
  });
  const delApi = needDel.map((el) => {
    return open<ReqAdminRoleDel, ResAdminRoleDel>(API_ADMIN_ROLE_DEL, {
      sysUserId: id,
      roleId: el,
    });
  });
  const a1 = await Promise.all([...addApi, ...delApi]);
  // 创建返回数据
  const data = bag<boolean>(a1);
  // 特殊处理
  let flag = true;
  a1.forEach((el) => {
    if (isFailRes(el) || isErrRes(el)) {
      flag = false;
    }
  });
  data.payload = flag;
  return data;
}

// 公司下拉
export async function getCompanylistService(params: any) {
  return simpleListService<ReqCompanylist, ResCompanylist, Companylist>(API_COMPANY_LIST, params);
}
// 部门下拉
export async function getDepartmentlistService(params: any) {
  return simpleListService<ReqDepartmentlist, ResDepartmentlist, Departmentlist
  >(API_DEPARTMENTLIST_LIST, params);
}
// 查询当前管理员的已有小区
export async function getAdminAllocableCellService(params: any) {
  return simpleListService<ReqAdminAllocableCelllist, ResAdminAllocableCelllist, AdminAllocableCelllist
  >(API_ADMIN_ALLOCABLE_CELL_LIST, params);
}
// 查询所有的小区
export async function getAllocableCellService() {
  const data = await simpleListService<ReqAllocableCelllist, ResAllocableCelllist, AllocableCelllist>(API_ALLOCABLE_CELL_LIST, {
  });
  if (data.payload) {
    store.commit("SET_VILLAGE_LIST", data.payload);
  }
  return data;
}
// 设置管理员的小区
export async function editAdminVillageService(id: string, selected: string[], have: string[]) {
  logUtils.log("id", id);
  logUtils.log("selected", selected);
  logUtils.log("have", have);
  const needAdd = _.difference(selected, have);
  const needDel = _.difference(have, selected);
  logUtils.info("编辑管理员小区", `小区增加${needAdd}`);
  logUtils.info("编辑管理员小区", `小区减少${needDel}`);
  // 打开接口

  let a1;
  let sdata = [];
  logUtils.log("needAdd", needAdd);

  if (needAdd.length === 0) {
    a1 = await open<ReqeditAdminVillageDel, ReseditAdminVillageDel>(API_EDIT_ADMIN_VILLAGE_DEL, {
      sysUserId: id,
      minAreaBizId: needDel,
    });
  } else {
    a1 = await open<ReqeditAdminVillage, ReseditAdminVillage>(API_EDIT_ADMIN_VILLAGE, {
      sysUserId: id,
      minAreaBizId: needAdd,
    });
  }
  sdata = selected;
  // 创建返回数据
  const data = bag<boolean>(a1);
  // 特殊处理

  return {
    data,
    sdata,
  };
}
