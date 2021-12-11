/**
 * @Date 2021-01-20 15:13:29
 * @Remark
 */

// model

// 列表项
export interface CompanyDepartmentItem {
  id?: string;
  deptName: string;
  companyId: string;
  deptPId: string;
}
export interface ChildrenListItem {
  id?: string;
}

// 标准项
export type CompanyDepartment = CompanyDepartmentItem;
export type ChildrenList = ChildrenListItem;
// 详情项

// 模型
