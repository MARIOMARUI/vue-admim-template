# xxxx-admin

## 介绍

XXX管理端

## 安装

- 安装缓慢则参考 doc/npm&yarn.md 切换源地址
- VSCode 配置见 doc/VSCode.md

```bash
npm install
```

### 开发命令

```bash
// 启动开发服务器
npm run serve
npm run s

// 代码编译
npm run build
npm run b

// 代码检查
npm run lint
npm run l

// 其它
npm run gfp // 同步远程和本地分支
```

## 开发说明

### 注册和配置

cli 相关配置在根目录下的 vue.config.js 中进行,其它基本在 config 里面

- 代理配置: 在 vue.config.js 中配置 PROXY_TARGET
- 路由配置: 在 config 中的 bizRouters

### 字体图标

- 统一使用[阿里巴巴字体图标](https://www.iconfont.cn/)
- 字体图标文件放在 style/iconfont 文件夹下面

### 组件

- AreaCascader: 地区级联选择

## 目录说明

业务开发主要在 app/biz/component/config 目录进行

- app 模块页面目录
- biz 统一放置 api/model/service 的业务目录
- components 复用的组件的目录
- config 注册配置项目录
- http 通信方法封装目录
- public 公共基础方法目录
- router 路由配置目录
- shims 类型声明文件目录
- store 公共状态仓库目录
- style 样式(包括图片)目录
- utils 工具方法目录
- views 视图目录

## 依赖列表

### 第三方已封装

- GoEasy 推送服务

### 开发依赖

- 组件库 element-ui
- http 库 axios
- 工具方法库 lodash
- 时间处理 moment
- 图表库 echarts
- 简单富文本编辑器 wangeditor
- 复杂富文本编辑器 待定
- websocket 消息推送 goeasy

## 默认配置和约定

### 路径导入

- vue cli 默认提供绝对路径导入,不需要另行配置
- 如果 URL 以 @ 开头，它会做为一个模块请求被解析
- 具体见[URL 转换规则](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#url-%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99)

### 图标导入

- 优先使用 element-ui 提供的图标
- element-ui 无法完成开发时,使用 iconfont

### 跳过版本

- 跳过 element-ui 2.15.1 版本,有问题

## 代码风格和 Lint 规则

- [Vue 风格指南](https://cn.vuejs.org/v2/style-guide/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
