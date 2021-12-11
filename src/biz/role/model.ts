/**
 * @Date 2021-01-20 15:13:29
 * @Remark
 */

// lib
// model
import { Menu } from "../menu/model";
import { Permission } from "../permission/model";

// 列表项
export interface RoleItem {
  id: string;
  gmtCreate: string;
  sysRoleCode: string;
  sysRoleName: string;
}

// 标准项
export type Role = RoleItem;

// 详情项
export interface RoleDetail extends Role {
  // companyId: string;
  // deptId: string;
  menuList: Menu[];
  permissionList: Permission[];
}
