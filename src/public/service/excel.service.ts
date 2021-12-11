/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// lib
// config
// script & methods & public
import logUtils from "@/utils/logUtils";
import { getToken } from "@/public/logic/token";
// state
// http
import { createApiUrl, createInstance, setUrlWithParams } from "@/http/core";
import { AxiosError, AxiosResponse } from "axios";
// api
import { Api } from "@/public/model/api";
// interface && type && class
// 其它

function downloadAction(data: any) {
  // 时间戳
  const timestamps = new Date().getTime();
  const blob = new Blob([data], {
    type: "application/vnd.ms-excel;charset=utf8",
  });
  const linkElement = document.createElement("a");
  const href = window.URL.createObjectURL(blob);
  linkElement.href = href;
  linkElement.setAttribute("download", `v${timestamps}.xlsx`);
  document.body.appendChild(linkElement);
  linkElement.click();
  document.body.removeChild(linkElement);
  window.URL.revokeObjectURL(href);
}

/**
 * 导出excel列表
 */
export function downloadExcelService<T>(api: Api, params: T) {
  // 设置url
  const path = setUrlWithParams(createApiUrl(api), params, true);
  // token
  const token = getToken();

  return new Promise((resolve, reject) => {
    createInstance(true)
      .get(path, {
        headers: {
          authorization: token,
        },
        responseType: "blob", // 不要动
      })
      .then((res: AxiosResponse<any>) => {
        logUtils.info(res.data, "导出Excel");
        if (res.data.type === "application/json") {
          const reader = new FileReader();
          reader.readAsText(res.data, "utf-8");
          reader.onload = () => {
            try {
              const data = JSON.parse(reader.result as string);
              reject(data.message);
            } catch (error) {
              const message: any = "下载失败";
              reject(message);
            }
          };
        } else {
          downloadAction(res.data);
          resolve("");
        }
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
}

/**
 * 示例
 */
// export function downloadIncomeRecordExcelService(
//   params: IReqIncomeRecordExcel,
// ) {
//   return downloadExcelService(API_INCOME_RECORD_EXCEL, params);
// }

// export async function downloadIncomeRecordExcel(form: Store) {
//   const params: IReqIncomeRecordExcel = {
//     verificationMobile: form.mobile.trim(),
//     validCode: form.code.trim(),
//   };
//   try {
//     await downloadIncomeRecordExcelService(params);
//     toast.success("导出Excel成功");
//   } catch (error) {
//     toast.error(error || "导出Excel失败");
//   }
// }
