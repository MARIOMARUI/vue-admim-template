/**
 * @Date 2021-01-20 15:13:29
 * @Remark
 */

// lib
// model

// 列表项
export interface PermissionItem {
  id: string;
  sysPermCode: string;
  sysPermDescription: string;
  sysPermName: string;
  sysPermUrl: string;
  gmtCreate: string;
}

// 标准项
export type Permission = PermissionItem;

// 详情项

// 模型
