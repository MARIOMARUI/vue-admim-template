/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

import logUtils from "@/utils/logUtils";

let goEasyEntity: any = null;

export function setEntity(obj: any) {
  goEasyEntity = obj;
  logUtils.info("goEasy设置Entity", goEasyEntity);
}

export function getEntity() {
  if (!goEasyEntity) {
    logUtils.warn("goEasy获得Entity", "要获取center对象,但是对象为null");
  }
  return goEasyEntity;
}
