/**
 * @Date 2021-11-25 18:08:14
 * @Remark
 */

import UrlParse from "url-parse";

// 获得UrlParse对象
function getParseUrl(url: string, parser: any = true) {
  return new UrlParse(url, parser);
}

// 获得id
function getUrlQueryId(location: any) {
  const url: any = getParseUrl(`${location.pathname}${location.search}`);
  const { id } = url.query;

  return id;
}

// 获得携带参数
function getUrlQuery(location: any) {
  const url = getParseUrl(`${location.pathname}${location.search}`);
  return url.query;
}

export default {
  getParseUrl,
  getUrlQuery,
  getUrlQueryId,
};
