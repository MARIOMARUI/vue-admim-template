/**
 * @Date 2021-02-20 16:26:42
 * @Remark
 */

// lib
import { RouteConfig } from "vue-router";

/**
 * 权限路由
 * 具体业务
 */
const bizRouters: RouteConfig[] = [
  {
    path: "/template",
    name: "Template",
    meta: {
      title: "页面模版",
      icon: "phone-outline",
    },
    component: () => import("@/views/Layout/Content.vue"),
    children: [
      {
        path: "/template/chart",
        name: "TemplateChart",
        meta: {
          title: "图表设置",
        },
        component: () => import("@/app/Template/Chart/Main.vue"),
      },
      {
        path: "/template/editor",
        name: "TemplateEditor",
        meta: {
          title: "富文本编辑器",
        },
        component: () => import("@/app/Template/Editor/Main.vue"),
      },
      {
        path: "/template/downloadFile",
        name: "TemplateDownloadFile",
        meta: {
          title: "下载文件",
        },
        component: () => import("@/app/Template/DownloadFile/Main.vue"),
      },
      {
        path: "/template/uploadFile",
        name: "TemplateUploadFile",
        meta: {
          title: "上传文件",
        },
        component: () => import("@/app/Template/UploadFile/Main.vue"),
      },
      {
        path: "/template/push",
        name: "TemplatePush",
        meta: {
          title: "消息推送",
        },
        component: () => import("@/app/Template/Push/Main.vue"),
      },
      {
        path: "/template/areaPicker",
        name: "AreaPicker",
        meta: {
          title: "地区选择",
        },
        component: () => import("@/app/Template/AreaPicker/Main.vue"),
      },
    ],
  },
  {
    path: "/system",
    name: "System",
    meta: {
      title: "系统管理",
      icon: "s-tools",
    },
    component: () => import("@/views/Layout/Content.vue"),
    children: [
      {
        path: "/system/admin",
        name: "SystemAdmin",
        meta: {
          title: "管理员账户",
        },
        component: () => import("@/app/System/Admin/Main.vue"),
      },
      {
        path: "/system/role",
        name: "SystemRole",
        meta: {
          title: "角色管理",
        },
        component: () => import("@/app/System/Role/Main.vue"),
      },
      {
        path: "/system/menu",
        name: "SystemMenu",
        meta: {
          title: "菜单管理",
        },
        component: () => import("@/app/System/Menu/Main.vue"),
      },
      {
        path: "/system/permission",
        name: "SystemPermission",
        meta: {
          title: "权限管理",
        },
        component: () => import("@/app/System/Permission/Main.vue"),
      },
      {
        path: "/system/companyList",
        name: "CompanyList",
        meta: {
          title: "公司管理",
        },
        component: () => import("@/app/System/CompanyList/Main.vue"),
      },
      {
        path: "/system/department",
        name: "Department",
        meta: {
          title: "部门管理",
        },
        component: () => import("@/app/System/Department/Main.vue"),
      },
      {
        path: "/system/operationLog",
        name: "OperationLog",
        meta: {
          title: "操作日志",
        },
        component: () => import("@/app/System/OperationLog/Main.vue"),
      },
      {
        path: "/system/bigScreen",
        name: "BigScreen",
        meta: {
          title: "数据大屏",
          hidden: true,
        },
        component: () => import("@/app/BigScreen/Main.vue"),
      },
    ],
  },
];

export default bizRouters;
