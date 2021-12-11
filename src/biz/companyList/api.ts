/*
 * @Author: marui
 * @Date: 2021-11-25 18:08:14
 * @Description: ""
 */
/**
 * @Date 2021-11-29 10:03:40
 * @Remark  公司列表列表
 */

import { Api } from "@/public/model/api";
import { ReqPage, ResBoolean, ResObject, ResPage } from "@/public/model/base";
import {
  CompanyListItem,
} from "./model";

/**
 * api
 */
export const API_COMPANYLIST_PAGE: Api = {
  title: "公司列表分页",
  path: "company/list",
  method: "POST",
  prefix: "api/backstage",
  remark: "公司列表CompanyList操作接口",
};

// req
export interface ReqCompanyListPage extends ReqPage {
  companyName?: string;
}

// res
export type ResCompanyListPage = ResPage<CompanyListItem>;

/**
 * api
 */
export const API_COMPANYLIST_ADD: Api = {
  title: "添加公司列表",
  path: "company/add",
  method: "POST",
  prefix: "api/backstage",
  remark: "公司列表CompanyList操作接口",
};

// req
export interface ReqCompanyListAdd {
  companyName: string;
}

// res
export type ResCompanyListAdd = ResObject<CompanyListItem>;

/**
 * api
 *
 */
export const API_COMPANYLIST_UPDATE: Api = {
  title: "编辑公司列表",
  path: "company/update",
  method: "POST",
  prefix: "api/backstage",
  remark: "公司列表CompanyList操作接口",
};

// req
export interface ReqCompanyListUpdate {
  companyId: string;
}

// res
export type ResCompanyListUpdate = ResObject<CompanyListItem>;

/**
 * api
 */
export const API_COMPANYLIST_DEL: Api = {
  title: "删除公司列表",
  path: "company/delete",
  method: "POST",
  prefix: "api/backstage",
  remark: "公司列表CompanyList操作接口",
};

// req
export interface ReqCompanyListDel {
  companyId: string;
}

// res
export type ResCompanyListDel = ResBoolean;
