/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// lib
// config
import { ROOT_ADMIN_ID } from "@/config/setting";
// script & methods & public
import timeUtils from "@/utils/timeUtils";
// store
import store from "@/store";
// http
import { open, bag, isOkRes } from "@/http/api";
import { createApiUrl, setUrlWithParams } from "@/http/core";
// api
import {
  API_LOGIN,
  ReqLogin,
  ResLogin,
  API_LOGOUT,
  API_CODE,
  ReqUpdatePwd,
  ResUpdatePwd,
  API_UPDATE_PWD,
  API_MOBILE_CODE,
  ResMobileCode,
  ReqMobileCode,
} from "./api";
// interface && type
import { ResSimple } from "@/public/model/base";
import { Account, getAccountByDto } from "@/biz/authorize/model";
import { simpleBooleanService } from "@/public/service/simple.service";
// 其它

/**
 * 获取验证码
 */
export function getCodeService() {
  const url = createApiUrl(API_CODE);
  const path = setUrlWithParams(url, {}, true);
  return path;
}

/**
 * 登录
 */
export async function loginService(
  username: string,
  pwd: string,
  code: string,
  phoneVcode: string,
) {
  // 打开接口
  const a1 = await open<ReqLogin, ResLogin>(API_LOGIN, {
    sysUserName: username.trim(),
    sysUserPass: pwd.trim(),
    validateCode: code.trim(),
    phoneVcode: phoneVcode.trim(),
  });
  // 创建返回数据
  const data = bag<Account>(a1);
  // 处理
  if (isOkRes(a1)) {
    const account = getAccountByDto(a1.data.userInfo);
    store.commit("SET_ACCOUNT", account);
    store.commit("SET_TOKEN", a1.data.token);
    data.payload = account;
  }
  // 返回
  return data;
}

/**
 * 登录-开阀环境使用
 */
export async function mockLoginService(username: string) {
  // 创建返回数据
  const data = bag<Account>([]);
  // 处理
  const account = {
    id: ROOT_ADMIN_ID,
    username,
    gmtCreate: timeUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss "),
    menuList: [],
    permissionList: [],
    companyId: "",
  };
  store.commit("SET_ACCOUNT", account);
  store.commit("SET_TOKEN", "mock");
  data.payload = account;
  // 返回
  return data;
}

/**
 * 注销登录
 */
export async function logoutService(outTime: number) {
  // 打开接口
  const a1 = await open<{}, ResSimple>(API_LOGOUT, {});
  // 创建返回数据
  const data = bag<boolean>([a1]);
  // 成功后处理
  store.commit("SET_TOKEN", undefined);
  if (outTime > 0) {
    setTimeout(() => {
      window.location.reload();
    }, outTime);
  }
  data.payload = true;
  // 返回
  return data;
}

export async function updatePwdService(oldPwd: string, newPwd: string) {
  const account: Account = store.getters.accountInfo;
  // 打开接口
  const result = await simpleBooleanService<ReqUpdatePwd, ResUpdatePwd>(API_UPDATE_PWD, {
    sysUserId: account.id,
    oldPass: oldPwd.trim(),
    sysUserPass: newPwd.trim(),
  });
  return result;
}

// export async function letUserInfoUpdateService(nickname: string) {
//   const params: IReqUserInfoUpdate = {
//     userName: nickname.trim(),
//   };
//   // 打开接口
//   const a1 = await open<IReqUserInfoUpdate, IRes>(API_USER_INFO_UPDATE, params);
//   // 创建返回数据
//   const data = bag<boolean>([a1]);
//   // 成功后处理
//   if (isOkRes(a1)) {
//     userSAO.accountValueSetter({
//       nickname: params.userName,
//     });
//     data.payload = true;
//   }
//   return data;
// }

// // 版本信息
// export async function getUpgradeVersionService() {
//   // 打开接口
//   const a1 = await open<{}, IResUpgradeVersion>(
//     API_UPGRADE_VERSION,
//     {},
//     {
//       long: false,
//       fresh: true,
//     },
//   );
//   // 创建返回数据
//   const data = bag<IDataUpgradeVersion>([a1]);
//   // 成功后处理
//   if (isOkRes(a1)) {
//     data.payload = a1.data;
//   }
//   return data;
// }

// 获取手机验证码
export async function getMobileCodeService(params: any) {
  // 打开接口
  const a1 = await open<ReqMobileCode, ResMobileCode>(API_MOBILE_CODE, params);
  // 创建返回数据
  const data = bag<boolean>([a1]);
  // 成功后处理
  if (isOkRes(a1)) {
    data.payload = true;
  }
  return data;
}
