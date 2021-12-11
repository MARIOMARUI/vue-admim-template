<!--
 * @Author: marui
 * @Date: 2021-11-25 18:08:14
 * @LastEditTime: 2021-12-03 18:05:08
 * @Description: ""
-->
<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="show" :before-close="cancel">
    <el-checkbox-group v-model="checkedRoles" @change="handleCheckChange" v-loading="loading">
      <el-col v-for="item in menuList" :key="item.id" :span="6">
        <el-checkbox :label="item.id">{{ item.sysMenuName }}</el-checkbox>
      </el-col>
    </el-checkbox-group>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
// lib
// components & widgets
// config
// script
// controller & service
import { getMenuListService } from "@/biz/menu/service";
import { editRoleMenuService, getRoleInfoService } from "@/biz/role/service";
// interface
import { StoreState } from "@/store";
import { Role } from "@/biz/role/model";
// 其它

@Component
export default class MenuModal extends Vue {
  @Prop(Object) info!: Role | null;
  title = "";
  loading = false;
  have: string[] = [];
  checkedRoles: string[] = [];
  get show() {
    return !!this.info;
  }
  @Emit("close")
  cancel() {
    return false;
  }
  @Emit("close")
  ok() {
    return true;
  }
  @Watch("show")
  onChangeValue(newVal: boolean) {
    if (newVal && this.info) {
      this.title = `编辑角色 [${this.info.sysRoleName}] 的菜单`;
      this.init();
    }
  }
  get menuList() {
    const state: StoreState = this.$store.state;
    return state.dict.menuList;
  }
  async init() {
    if (!this.info) return;
    getMenuListService();
    this.have = [];
    this.checkedRoles = [];
    this.loading = true;
    const result = await getRoleInfoService(this.info.id);
    this.loading = false;
    // 成功
    if (result.payload) {
      const list = result.payload.menuList.map((el) => el.id);
      this.have = list;
      this.checkedRoles = list;
    }
  }
  async handleCheckChange(list: string[]) {
    if (!this.info) return;
    this.loading = true;
    const result = await editRoleMenuService(this.info.id, list, this.have);
    this.loading = false;
    if (result.payload) {
      this.$message.success("设置成功");
      this.have = list;
    } else {
      this.$message.warning("设置异常,请重新设置");
      this.ok();
    }
  }
}
</script>

<style lang="scss">
.el-col {
  overflow: hidden;
}
.el-pagination {
  text-align: right;
}
.el-checkbox-group {
  display: inline-block;
}
</style>
