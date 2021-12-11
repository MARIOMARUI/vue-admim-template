/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// api
export interface Api {
  title: string;
  path: string;
  method: "" | "GET" | "POST" | "UPLOAD" | "STATIC";
  prefix: "api/communal" | "api/backstage" | "";
  controller?: string;
  remark?: string;
}

// basic res
export interface Res {
  result: number;
  message: string;
  data?: unknown;
}
