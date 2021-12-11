<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible="show"
    :before-close="cancel"
  >
    <el-checkbox-group
      v-model="checkedRoles"
      @change="handleCheckChange"
      v-loading="loading"
    >
      <el-checkbox v-for="item in roleList" :label="item.id" :key="item.id">{{
        item.sysRoleName
      }}</el-checkbox>
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
import { getRoleListService } from "@/biz/role/service";
import {
  editAdminRoleService,
  getAdminRoleListService,
} from "@/biz/admin/service";
// interface
import { Admin } from "@/biz/admin/model";
import { StoreState } from "@/store";
// 其它

@Component
export default class EditModal extends Vue {
  @Prop(Object) info!: Admin | null;
  title = "";
  loading = false;
  have: string[] = [];
  checkedRoles: string[] = [];
  get show() {
    return !!this.info;
  }
  @Emit("close")
  cancel() {
    return null;
  }
  // @Emit("close")
  // ok() {
  //   return this.info;
  // }
  @Watch("show")
  onChangeValue(newVal: boolean) {
    if (newVal && this.info) {
      this.title = `编辑账户 [${this.info.sysUserName}] 的角色`;
      this.init();
    }
  }
  get roleList() {
    const state: StoreState = this.$store.state;
    return state.dict.roleList;
  }
  async init() {
    if (!this.info) return;
    // 获得所有角色列表
    getRoleListService();
    this.have = [];
    this.checkedRoles = [];
    this.loading = true;
    // 获取当前管理员的已有角色
    const result = await getAdminRoleListService(this.info.sysUserId);
    this.loading = false;
    // 成功
    if (result.payload) {
      const list = result.payload.map((el) => el.id);
      this.have = list;
      this.checkedRoles = list;
    }
  }
  async handleCheckChange(list: string[]) {
    if (!this.info) return;
    this.loading = true;
    const result = await editAdminRoleService(
      this.info.sysUserId,
      list,
      this.have,
    );
    this.loading = false;
    if (result.payload) {
      this.$message.success("设置成功");
      this.have = list;
    } else {
      this.$message.warning("设置异常,请重新设置");
      this.cancel();
    }
  }
}
</script>

<style lang="scss">
</style>
