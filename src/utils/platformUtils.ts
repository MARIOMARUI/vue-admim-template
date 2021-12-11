/**
 * @Date 2021-02-23 11:51:40
 * @Remark
 */

/**
 * 是否是微信浏览器
 */
function isWX(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  const flag: RegExpMatchArray | null = ua.match(/micromessenger/i);
  if (flag) {
    const uaStr = flag.toString();
    return uaStr === "micromessenger";
  }
  return false;
}

/**
 * 是否是iphone
 */
function isIOS(): boolean {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export default {
  isWX,
  isIOS,
};
