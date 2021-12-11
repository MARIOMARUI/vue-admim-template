/*
 * @Descripttion: 
 * @version: 
 * @Author: marui
 * @Date: 2021-11-29 10:03:10
 */
/**
 * vue-cli配置
 */

const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const path = require("path");
// 服务器地址
// const DEV_SERVER = "http://192.168.0.83:55001/";
// const BETA_SERVER = "http://test.com";
const PROD_SERVER = "http://admin.scyhtech.cn/";
// 代理目标
const PROXY_TARGET = PROD_SERVER;

module.exports = {
  productionSourceMap: false, // 不要SourceMap
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
    }
  },
  devServer: {
    port: 8080, // 端口设置
    // open: true, // 自动开启浏览器
    proxy: {
      api: {
        target: PROXY_TARGET,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
};
