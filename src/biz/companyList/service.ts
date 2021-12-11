/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// lib
// config
// script & methods & public
// http
// service
import {
  simplePageService,
  simpleObjectService,
  simpleBooleanService,
} from "@/public/service/simple.service";
// api
import {
  ReqCompanyListPage,
  ResCompanyListPage,
  API_COMPANYLIST_PAGE,
  ReqCompanyListAdd,
  API_COMPANYLIST_ADD,
  ResCompanyListAdd,
  API_COMPANYLIST_UPDATE,
  ReqCompanyListUpdate,
  ResCompanyListUpdate,
  API_COMPANYLIST_DEL,
  ReqCompanyListDel,
  ResCompanyListDel,
} from "./api";
// interface && type && class
import { CompanyListItem } from "./model";
// 其它

// 公司列表分页
export async function getCompanyListPageService(params: ReqCompanyListPage) {
  return simplePageService<ReqCompanyListPage, ResCompanyListPage, CompanyListItem>(
    API_COMPANYLIST_PAGE,
    params,
  );
}

// 公司列表添加
export async function addCompanyListService(params: ReqCompanyListAdd) {
  return simpleObjectService<ReqCompanyListAdd, ResCompanyListAdd, CompanyListItem>(
    API_COMPANYLIST_ADD,
    params,
  );
}

// 公司列表编辑
export async function updateCompanyListService(params: ReqCompanyListUpdate) {
  return simpleObjectService<ReqCompanyListUpdate, ResCompanyListUpdate, CompanyListItem>(
    API_COMPANYLIST_UPDATE,
    params,
  );
}

// 公司列表删除
export async function delCompanyListService(params: ReqCompanyListDel) {
  return simpleBooleanService<ReqCompanyListDel, ResCompanyListDel>(API_COMPANYLIST_DEL, params);
}
