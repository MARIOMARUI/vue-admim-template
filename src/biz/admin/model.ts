/*
 * @Descripttion:
 * @version:
 * @Author: marui
 * @Date: 2021-02-20 16:45:10
 */
/**
 * @Date 2021-01-20 15:13:29
 * @Remark
 */

// model

// 列表项
export interface AdminItem {
  sysUserId: string;
  companyId: string;
  deptId: string;
  mobile: string;
  sysUserName: string;
  sysUserPass: string;
  birthday: string;
  sex: string;
  homeAddress: string;
  fullName: string;
}
export interface CompanylistItem {
  id: string;
}
export interface DepartmentlistItem {
  id: string;
}
export interface AdminAllocableCelllistItem {
  belongName: any;
  minAreaId?: string;
}
export interface AllocableCelllistItem {
  minAreaBizId: any;
  id?: string;
}
export interface EditAdminVillageItem {
  minAreaBizId: string;
  sysUserId: string;
}

// 标准项
export type Admin = AdminItem;
export type Companylist = CompanylistItem;
export type Departmentlist = DepartmentlistItem;
export type AdminAllocableCelllist = AdminAllocableCelllistItem;
export type AllocableCelllist = AllocableCelllistItem;
export type EditAdminVillage = EditAdminVillageItem;

// 详情项

// 模型
