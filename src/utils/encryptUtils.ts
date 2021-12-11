/**
 * @Date 2019-09-13 17:58:16
 * @Remark
 */

// lib
import AES from "crypto-js/aes";
import enc from "crypto-js/enc-utf8";
// config
import { CRYPTO_KEY } from "@/config/setting";
// interface && type

/**
 * 加密
 */
function encrypt<T>(data: T): string {
  const bytes = AES.encrypt(JSON.stringify(data), CRYPTO_KEY);
  return bytes.toString();
}

/**
 * 解密
 */
function decrypt<T>(data: string): T {
  const bytes = AES.decrypt(data, CRYPTO_KEY);
  return JSON.parse(enc.stringify(bytes));
}

export default {
  encrypt,
  decrypt,
};
