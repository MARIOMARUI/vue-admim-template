/*
 * @Descripttion:
 * @version:
 * @Author: marui
 * @Date: 2021-04-15 18:46:35
 */
/**
 * @Date 2021-04-15 17:57:43
 * @Remark 权限指令
 */

import store from "@/store";
import { ROOT_ADMIN_ID } from "@/config/setting";
import { DirectiveBinding } from "vue/types/options";

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const needPermissions: string[] | undefined = binding.value;

  const account = store.state.account.account;
  const accountId = account.id;
  const accountPermissions = account.permissionList; // 用户有权访问的菜单

  if (needPermissions && Array.isArray(needPermissions) && needPermissions.length > 0) {
    const permissions = accountPermissions.map((it) => it.sysPermCode);

    let havePermission = true;
    needPermissions.forEach((ele) => {
      if (!permissions.includes(ele)) {
        havePermission = false;
      }
    });
    // 根管理员有所有权限
    if (accountId === ROOT_ADMIN_ID) {
      havePermission = true;
    }
    if (!havePermission) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  } else {
    throw new Error("指令格式为 v-permission=\"['ADMIN_ADD', 'ADMIN_EDIT']\"");
  }
}

// bind?: DirectiveFunction;
// componentUpdated?: DirectiveFunction;
// unbind?: DirectiveFunction;

export default {
  inserted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  update(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
