<template>
  <el-menu
    class="aside-menu"
    :collapse-transition="false"
    :collapse="menuCollapse"
    :default-active="$route.path"
  >
    <router-link :to="{ name: dashboard.name }">
      <el-menu-item :index="dashboard.path">
        <i :class="'el-icon-' + dashboard.icon"></i>
        <span slot="title">{{ dashboard.title }}</span>
      </el-menu-item>
    </router-link>
    <template v-for="item in accountRouters">
      <router-link v-if="!item.children" :to="{ name: item.name }" :key="item.name">
        <el-menu-item :index="item.path">
          <i :class="'el-icon-' + item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-if="item.children && item.meta.access" :key="item.name" :index="item.path">
        <template slot="title">
          <i :class="'el-icon-' + item.meta.icon"></i>
          <span> {{ item.meta.title }} </span>
        </template>
        <template v-for="it in item.children">
          <router-link
            class="aside-menu-link"
            :key="it.name"
            v-if="!it.meta.hidden && it.meta.access"
            :to="{ name: it.name }"
          >
            <el-menu-item :index="it.path">{{ it.meta.title }} </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
// lib
// components & widgets
// config
// script & utils & public
import { StoreState } from "@/store";
// controller & service & logic
// interface
import { DashboardRouteTag } from "@/public/model/RouteTag";
import logUtils from "@/utils/logUtils";
import _ from "lodash";
// 其它

@Component({
  computed: mapGetters(["accountRouters"]),
})
export default class AsideMenu extends Vue {
  dashboard = DashboardRouteTag;
  $_resizeHandler: any | null = null;
  mounted() {
    this.initListener();
    this.resize();
  }
  beforeDestroy() {
    this.destroyListener();
  }
  get menuCollapse() {
    const state: StoreState = this.$store.state;
    return state.app.menuCollapse;
  }
  initListener() {
    logUtils.info("ResizeChartBase", "添加图表菜单栏监听");
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.$_resizeHandler = _.debounce(() => {
      this.resize();
    }, 100);
    window.addEventListener("resize", this.$_resizeHandler);
  }
  destroyListener() {
    logUtils.info("ResizeChartBase", "移除菜单栏响应式监听");
    window.removeEventListener("resize", this.$_resizeHandler);
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.$_resizeHandler = null;
  }
  resize() {
    const innerWidth = window.innerWidth;
    if (innerWidth <= 1000) {
      this.$store.commit("SET_MENU_COLLAPSE", true);
    } else {
      this.$store.commit("SET_MENU_COLLAPSE", false);
    }
  }
}
</script>

<style lang="scss">
.aside-menu {
  position: fixed;
  box-sizing: border-box;
  padding-bottom: 70px;
  background-color: #fff;
  letter-spacing: 1.2px;
  overflow-y: auto;
  height: 100%;
  border-right: none;
}
.aside-menu:not(.el-menu--collapse) {
  width: 200px;
}
.aside-menu-link {
  display: block;
}
.el-menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  text-align-last: justify;
  text-align: justify;
  text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
  &:after {
    display: inline-block;
    width: 100%;
    content: "";
    height: 0;
  }
}
</style>
