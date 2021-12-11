/**
 * @Date 2021-01-20 15:13:29
 * @Remark
 */

// model

// 列表项
export interface MenuItem {
  gmtCreate: string;
  id: string;
  sysMenuCode: string;
  // sysMenuIcon: null;
  sysMenuName: string;
  sysMenuUrl: string;
}

// 标准项
export type Menu = MenuItem;

// 详情项

// 模型
