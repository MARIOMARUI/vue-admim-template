/**
 * @Date 2019-09-13 17:44:13
 * @Remark
 */

export type IAppMode = "DEV" | "PROD" | "BETA";

export const APP_MODE_MAP: {
  DEV: IAppMode; // 开发环境
  PROD: IAppMode; // 生产环境
  BETA: IAppMode; // 测试环境
} = {
  DEV: "DEV", // 开发环境
  PROD: "PROD", // 生产环境
  BETA: "BETA", // 测试环境
};

export interface Domain {
  api: string;
  media: string;
}
