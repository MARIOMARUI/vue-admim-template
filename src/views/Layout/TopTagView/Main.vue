<template>
  <div class="ttv-container">
    <div class="ttv-tags">
      <scroll-area>
        <el-tag
          class="ttv-item"
          v-for="item in accountTagViews"
          :key="item.uuid"
          :effect="isActive(item) ? 'dark' : 'plain'"
          size="medium"
          :closable="item.name !== 'Dashboard'"
          @click="tagClick(item)"
          @close="tagClose(item)"
          >{{ item.title }}</el-tag
        >
      </scroll-area>
    </div>
    <div class="ttv-menu">
      <el-dropdown placement="bottom-end" size="medium">
        <span class="el-dropdown-link iconfont iconmenu" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="isActiveHome()">
            <div @click="closeActiveTag">关闭现在</div>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <div @click="closeOtherTags">关闭其它</div>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <div @click="closeAllTags">关闭所有</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// lib
import { Route } from "vue-router";
import { mapGetters } from "vuex";
// components & widgets
import ScrollArea from "./ScrollArea.vue";
// config
// script & utils & public
import logUtils from "@/utils/logUtils";
// controller & service & logic
// interface
import { DashboardRouteTag, RouteTag } from "@/public/model/RouteTag";
// 其它

@Component({
  components: {
    ScrollArea,
  },
  computed: mapGetters(["accountTagViews"]),
})
export default class TopTagView extends Vue {
  accountTagViews!: RouteTag[];
  activeTag: RouteTag | undefined = undefined;
  mounted() {
    this.initTags();
    this.addTags(this.$route);
  }
  beforeDestroy() {
    this.closeAllTags();
  }
  initTags() {
    this.$store.commit("ADD_TAG", DashboardRouteTag);
  }
  addTags(route: Route) {
    const { name, meta } = route;
    // 如果菜单隐藏hidden 不显示在tag中
    if (name && (!meta.hidden || false)) {
      this.$store.commit("ADD_TAG", this.$route);
    }
  }
  isActive(tag: RouteTag) {
    const flag = tag.path === this.$route.path;
    if (flag) {
      this.activeTag = tag;
    }
    return flag;
  }
  isActiveHome() {
    return this.activeTag && this.activeTag.name === "Dashboard";
  }
  tagClick(tag: RouteTag) {
    if (tag.path !== this.$route.path) {
      this.$router.push({
        path: tag.path,
      });
    }
  }
  tagClose(tag: RouteTag) {
    this.$store.commit("DEL_TAG", tag);
    if (this.isActive(tag)) {
      this.toLastView();
    }
  }
  toLastView() {
    const latestView = this.accountTagViews.slice(-1)[0];
    if (latestView) {
      logUtils.info("latestView", latestView);
      this.$router.replace({
        path: latestView.path,
      });
    } else {
      this.$router.push("/");
    }
  }
  closeActiveTag() {
    if (this.activeTag) {
      this.tagClose(this.activeTag);
    }
  }
  closeOtherTags() {
    if (this.activeTag) {
      this.$store.commit("DEL_TAG_OTHER", this.activeTag);
    }
  }
  closeAllTags() {
    this.$store.commit("DEL_TAG_OTHER", null);
    this.toLastView();
  }
  @Watch("$route")
  onChangeRoute(route: Route) {
    this.addTags(route);
  }
}
</script>

<style lang="scss" scoped>
.ttv-container {
  width: 100%;
  height: 28px;
  position: relative;
}
.ttv-item {
  cursor: pointer;
  margin-left: 5px;
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
}
.ttv-tags {
  margin-right: 30px;
}
.ttv-menu {
  width: 30px;
  height: 28px;
  line-height: 28px;
  text-align: right;
  position: absolute;
  top: 0;
  right: 0;

  .iconmenu {
    display: inline-block;
    width: 28px;
    height: 28px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
