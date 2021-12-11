/**
 * @Date 2021-02-22 14:21:04
 * @Remark
 */

// lib
// config
// script & methods & public
// http
// state
// api
import { API_RECHANGE_WATER_TEMP_DATA, API_TEMP_DATA, API_WATER_METER_TEMP_DATA } from "./api";
// interface && type && class
import { downloadExcelService } from "@/public/service/excel.service";
// 其它

// 获得模板
export async function getTempDataService() {
  return downloadExcelService(API_TEMP_DATA, {});
}
// 获取水表模板
export async function getTempWaterMeterService() {
  return downloadExcelService(API_WATER_METER_TEMP_DATA, {});
}
// 获取批量充值模板
export async function getTempRechangeWaterService() {
  return downloadExcelService(API_RECHANGE_WATER_TEMP_DATA, {});
}
