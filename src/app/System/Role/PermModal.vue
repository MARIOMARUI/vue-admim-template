<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible="show" :before-close="cancel">
    <el-checkbox-group v-model="checkedPermissions" @change="handleCheckChange" v-loading="loading">
      <el-col v-for="item in permList" :key="item.id" :span="8">
        <el-checkbox :label="item.id">{{ item.sysPermName }}</el-checkbox></el-col
      >
    </el-checkbox-group>
    <el-pagination
      :page-size="size"
      layout="prev, pager, next"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
// lib
// components & widgets
// config
// script
// controller & service
import { getPermissionListService } from "@/biz/permission/service";
import { editRolePermService, getRoleInfoService } from "@/biz/role/service";
// interface
import { StoreState } from "@/store";
import { Role } from "@/biz/role/model";
import { TABLE_SETTING } from "@/config/setting";
// 其它

@Component
export default class PermModal extends Vue {
  @Prop(Object) info!: Role | null;
  title = "";
  loading = false;
  have: string[] = [];
  checkedPermissions: string[] = [];
  page = TABLE_SETTING.PAGE;
  size = 50;
  total = 0;
  selectArr = [];
  get show() {
    return !!this.info;
  }
  sizeChange(size: number) {
    this.size = size;
    this.getPermissionList();
  }
  currentChange(current: number) {
    this.page = current;
    this.getPermissionList();
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
      this.title = `编辑角色 [${this.info.sysRoleName}] 的权限`;
      this.init();
    }
  }
  get permList() {
    const state: StoreState = this.$store.state;
    return state.dict.permList;
  }
  async init() {
    if (!this.info) return;
    this.getPermissionList();
    this.have = [];
    this.checkedPermissions = [];
    this.loading = true;
    const result = await getRoleInfoService(this.info.id);
    this.loading = false;
    // 成功
    if (result.payload) {
      const list = result.payload.permissionList.map((el) => el.id);
      // 当前角色所拥有的权限
      this.have = list;
      // 所选中的权限
      this.checkedPermissions = list;
    }
  }
  // 选中事件
  async handleCheckChange(list: string[]) {
    if (!this.info) return;
    this.loading = true;
    const result = await editRolePermService(this.info.id, list, this.have);
    this.loading = false;
    if (result.payload) {
      this.$message.success("设置成功");
      this.have = list;
    } else {
      this.$message.warning("设置异常,请重新设置");
      this.ok();
    }
  }
  // 获取权限列表
  async getPermissionList() {
    this.loading = true;
    const data = await getPermissionListService({
      pageNum: this.page,
      pageSize: this.size,
    });
    this.loading = false;
    if (data.payload) {
      this.total = data.payload.total;
    }
  }
}
</script>

<style lang="scss" scoped>
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
