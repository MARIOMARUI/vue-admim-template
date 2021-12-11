/*
 * @Descripttion:
 * @version:
 * @Author: marui
 * @Date: 2021-11-29 10:03:40
 */

import { Menu } from "../menu/model";
import { Permission } from "../permission/model";

// 列表项

// 标准项
export interface AccountDto {
  gmtCreate: string;
  menuList: Menu[] | null;
  permissionList: Permission[] | null;
  sysUserId: string;
  sysUserName: string;
  companyId: string;
  companyName: string;
  deptId: string;
  mobile: string;
}

// 模型
export interface Account {
  id: string;
  username: string;
  gmtCreate: string;
  menuList: Menu[];
  permissionList: Permission[];
  companyId: string;
}

export const BLANK_ACCOUNT: Account = {
  id: "",
  username: "",
  gmtCreate: "",
  menuList: [],
  permissionList: [],
  companyId: "",
};

export function getAccountByDto(dto: AccountDto) {
  const result: Account = {
    id: dto.sysUserId,
    username: dto.sysUserName,
    gmtCreate: dto.gmtCreate,
    menuList: dto.menuList || [],
    permissionList: dto.permissionList || [],
    companyId: dto.companyId,
  };
  return result;
}

export function getAccountListByDto(list: AccountDto[]) {
  return list.map(getAccountByDto);
}
