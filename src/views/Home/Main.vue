<template>
  <el-container direction="vertical" class="admin-container">
    <admin-header />
    <el-container class="container">
      <aside-menu />
      <el-main class="content-container" :class="menuCollapse ? 'ml-64' : 'ml-200'">
        <div class="content-tag-view">
          <top-tag-view />
        </div>
        <router-view v-if="isRouterAlive" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// lib
// components & widgets
import AdminHeader from "./AdminHeader.vue";
import AsideMenu from "./AsideMenu.vue";
import TopTagView from "../Layout/TopTagView/Main.vue";
// config
// script
// controller & service
import { getAreaDataService } from "@/biz/area/service";
// interface
import { StoreState } from "@/store";
// 其它

@Component({
  components: {
    AdminHeader,
    AsideMenu,
    TopTagView,
  },
})
export default class Home extends Vue {
  isRouterAlive = true;
  mounted() {
    // 获得地区数据
    getAreaDataService();
  }
  /*
   使用 v-if强制dom刷新
   这里在同一页面调用 无需使用provide / inject
   刷新界面
  */
  reload(): void {
    this.isRouterAlive = false;
    this.$nextTick(() => {
      this.isRouterAlive = true;
    });
  }
  get menuCollapse() {
    const state: StoreState = this.$store.state;
    return state.app.menuCollapse;
  }
}
</script>

<style lang="scss" scoped>
.ml-64 {
  margin-left: 64px;
}
.ml-200 {
  margin-left: 200px;
}
.admin-container {
  height: 100%;
}
.container {
  padding-top: 60px;
  display: flex;
}
.content-container {
  // margin-left: 200px;
  padding: 0 15px 15px 15px !important;
  display: flex !important;
  flex-direction: column;
}
.content-tag-view {
  margin: 10px 0;
}
</style>
