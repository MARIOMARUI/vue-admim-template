module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/airbnb", "@vue/typescript/recommended"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
  },
  rules: {
    "max-len": ["error", { code: 300 }],
    "no-console": "warn",
    "no-debugger": "warn",
    quotes: ["error", "double"],
    "lines-between-class-members": ["error", "never"], // 没有空格间隔
    "object-curly-newline": "off",
    "@typescript-eslint/no-explicit-any": "off", // 可以用any
    "prefer-destructuring": "off", // 不强制使用解构
    "linebreak-style": "off", // 不对换行格式做限制
    "import/order": "off", // 不要求import顺序
    "import/prefer-default-export": "off", // 不限制默认导出
    "class-methods-use-this": "off", // 不强制静态方法
    "import/no-cycle": "off", // 不检测循环引用
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "arrow-body-style": "off",
    "operator-linebreak": "off", // 不对运算符换行做限制
    "arrow-parens": ["error", "always", { requireForBlockBody: true }],
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        allowSingleExtends: true,
      },
    ],
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
  },
};
