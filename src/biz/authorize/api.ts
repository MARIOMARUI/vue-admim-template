/*
 * @Author: marui
 * @Date: 2021-11-25 18:08:14
 * @LastEditTime: 2021-11-30 09:53:53
 * @Description: ""
 */

import { Api, Res } from "@/public/model/api";
import { ResBoolean } from "@/public/model/base";
import { AccountDto } from "./model";

/**
 * api
 */
export const API_UPDATE_PWD: Api = {
  title: "修改密码",
  path: "user/update_pass",
  method: "POST",
  prefix: "api/backstage",
  remark: " 用户user操作接口",
};

// req
export interface ReqUpdatePwd {
  sysUserId: string;
  oldPass: string;
  sysUserPass: string;
}

// res
export interface ResUpdatePwd extends Res {
  data: boolean;
}

/**
 * api
 */
export const API_LOGIN: Api = {
  title: "登录",
  path: "sys/login",
  method: "POST",
  prefix: "api/backstage",
  remark: "通用系统用户登录注销操作接口",
};

// req
export interface ReqLogin {
  sysUserName: string;
  sysUserPass: string;
  validateCode: string;
  phoneVcode: string;
}

// res
export interface ResLogin extends Res {
  data: {
    token: string;
    userInfo: AccountDto;
  };
}

/**
 * api
 */
export const API_CODE: Api = {
  title: "验证码",
  path: "sys/validateCode",
  method: "GET",
  prefix: "api/backstage",
  remark: "通用系统用户登录注销操作接口",
};

/**
 * api
 */
export const API_LOGOUT: Api = {
  title: "退出",
  path: "sys/logout",
  method: "POST",
  prefix: "api/backstage",
  remark: "通用系统用户登录注销操作接口",
};

/**
 * api
 */
export const API_MOBILE_CODE: Api = {
  title: "发送手机验证码",
  path: "sys/admin_login_send_phone",
  method: "POST",
  prefix: "api/backstage",
  remark: "通用系统用户登录注销操作接口",
};

// req
export interface ReqMobileCode {
  username: string;
}
// res
export type ResMobileCode = ResBoolean;
