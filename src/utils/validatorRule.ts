/**
 * @Date 2021-11-29 10:03:40
 * @Remark https://github.com/yiminghe/async-validator的验证规则
 */

export const REQUIRED_RULE = (name?: string) => ({
  required: true,
  message: name || "该字段是必填项",
});

export const MIN_MAX_RULE = (min: number, max: number) => ({
  min,
  max,
  message: `${min}至${max}个字符之间`,
});

export const LENGTH_RULE = (len: number) => ({
  len,
  message: `应为${len}个字符`,
});

export const EMAIL_RULE = (name = "该字段") => ({
  type: "email",
  message: `${name}必须是电子邮箱`,
});

export const INPUT_REQUIRED_RULE = REQUIRED_RULE();
//
export const MOBILE_LENGTH_RULE = LENGTH_RULE(11);
// 名称类
export const NAME_LENGTH_RULE = MIN_MAX_RULE(2, 32);
// 密码类
export const PWD_LENGTH_RULE = MIN_MAX_RULE(6, 32);
//
export const IP_LENGTH_RULE = MIN_MAX_RULE(1, 46);
//
export const EMAIL_TYPE_RULE = EMAIL_RULE();
//
export const CODE_LENGTH_RULE = MIN_MAX_RULE(3, 50);
//
export const IMAGE_LENGTH_RULE = MIN_MAX_RULE(1, 200);
//
export const DESC_LENGTH_RULE = MIN_MAX_RULE(1, 100);
//
export const SHOW_LENGTH_RULE = MIN_MAX_RULE(1, 1000);
//
export const TEXT_LENGTH_RULE = MIN_MAX_RULE(1, 10000);
