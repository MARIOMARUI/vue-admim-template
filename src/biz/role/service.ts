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
} from "@/public/service/simple.service";
import store from "@/store";
// api
import {
  ReqRolePage,
  ResRolePage,
  API_ROLE_PAGE,
  ReqRoleAdd,
  API_ROLE_ADD,
  ResRoleAdd,
  API_ROLE_UPDATE,
  ReqRoleUpdate,
  ResRoleUpdate,
  API_ROLE_DEL,
  ReqRoleDel,
  ResRoleDel,
  API_ROLE_INFO,
  ReqRoleInfo,
  ResRoleInfo,
  API_ROLE_PERMISSION_ADD,
  ReqRolePermAdd,
  ResRolePermAdd,
  API_ROLE_PERMISSION_DEL,
  ReqRolePermDel,
  ResRolePermDel,
  API_ROLE_MENU_ADD,
  ReqRoleMenuAdd,
  ResRoleMenuAdd,
  API_ROLE_MENU_DEL,
  ReqRoleMenuDel,
  ResRoleMenuDel,
} from "./api";
// interface && type && class
import { RoleDetail, Role } from "./model";
// 其它

// 角色分页
export async function getRolePageService(params: ReqRolePage) {
  return simplePageService<ReqRolePage, ResRolePage, Role>(API_ROLE_PAGE, params);
}

// 角色列表
export async function getRoleListService() {
  const data = await simplePageService<ReqRolePage, ResRolePage, Role>(API_ROLE_PAGE, {
    pageNum: 1,
    pageSize: 100,
  });
  if (data.payload) {
    store.commit("SET_ROLE_LIST", data.payload.list);
  }
  return data;
}
// 角色添加
export async function addRoleService(params: ReqRoleAdd) {
  return simpleObjectService<ReqRoleAdd, ResRoleAdd, Role>(API_ROLE_ADD, params);
}

// 角色编辑
export async function updateRoleService(params: ReqRoleUpdate) {
  return simpleObjectService<ReqRoleUpdate, ResRoleUpdate, Role>(API_ROLE_UPDATE, params);
}

// 角色删除
export async function delRoleService(id: string) {
  return simpleBooleanService<ReqRoleDel, ResRoleDel>(API_ROLE_DEL, {
    id,
  });
}

// 角色信息
export async function getRoleInfoService(id: string) {
  return simpleObjectService<ReqRoleInfo, ResRoleInfo, RoleDetail>(API_ROLE_INFO, {
    roleId: id,
  });
}

// 编辑角色权限
export async function editRolePermService(id: string, selected: string[], have: string[]) {
  logUtils.log(id, selected, have);
  const needAdd = _.difference(selected, have);
  const needDel = _.difference(have, selected);
  logUtils.info("角色权限编辑", `角色增加权限${needAdd}`);
  logUtils.info("角色权限编辑", `角色减少权限${needDel}`);
  // 打开接口
  const addApi = needAdd.map((el) => {
    return open<ReqRolePermAdd, ResRolePermAdd>(API_ROLE_PERMISSION_ADD, {
      roleId: id,
      permId: el,
    });
  });
  const delApi = needDel.map((el) => {
    return open<ReqRolePermDel, ResRolePermDel>(API_ROLE_PERMISSION_DEL, {
      roleId: id,
      permId: el,
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

// 编辑角色权限
export async function editRoleMenuService(id: string, selected: string[], have: string[]) {
  const needAdd = _.difference(selected, have);
  const needDel = _.difference(have, selected);
  logUtils.info("角色菜单编辑", `角色增加菜单${needAdd}`);
  logUtils.info("角色菜单编辑", `角色减少菜单${needDel}`);
  // 打开接口
  const addApi = needAdd.map((el) => {
    return open<ReqRoleMenuAdd, ResRoleMenuAdd>(API_ROLE_MENU_ADD, {
      roleId: id,
      menuId: el,
    });
  });
  const delApi = needDel.map((el) => {
    return open<ReqRoleMenuDel, ResRoleMenuDel>(API_ROLE_MENU_DEL, {
      roleId: id,
      menuId: el,
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
