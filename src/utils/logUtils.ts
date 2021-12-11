/**
 * @Date 2019-09-27 10:42:35
 * @Remark
 */

import { isProdMode } from "@/config/env";

// console对象
const CONSOLE: Console = console;

/**
 * 创建标题
 * @param tag 标签
 */
function createTitle(tag: string) {
  return `|${tag}|`;
}

/**
 * console.log
 * @param msg 数据
 */
function log(...msg: any[]) {
  if (!isProdMode()) {
    CONSOLE.info(...msg);
  }
}

/**
 * console.info
 * @param tag 标签
 * @param msg 数据
 */
function info(tag: string, ...msg: any[]) {
  if (!isProdMode()) {
    CONSOLE.info(createTitle(tag), ...msg);
  }
}

/**
 * console.warn
 * @param tag 标签
 * @param msg 数据
 */
function warn(tag: string, ...msg: any[]) {
  if (!isProdMode()) {
    CONSOLE.warn(createTitle(tag), ...msg);
  }
}

/**
 * console.error
 * @param tag 标签
 * @param msg 数据
 */
function error(tag: string, ...msg: any[]) {
  if (!isProdMode()) {
    CONSOLE.error(createTitle(tag), ...msg);
  }
}

export default {
  log,
  info,
  warn,
  error,
  console: CONSOLE,
};
