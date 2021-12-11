<template>
  <div class="content-main">
    <div>
      <el-form :inline="true" :model="form" ref="form">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="角色名称" />
        </el-form-item>
        <el-form-item label="角色代码" prop="code">
          <el-input v-model="form.code" placeholder="角色代码" />
        </el-form-item>
      </el-form>
    </div>
    <div class="content-search">
      <el-button type="primary" icon="el-icon-search" @click="search"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh-right" @click="reset">重置</el-button>
    </div>
    <div class="content-edit">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="add"
        :disabled="total >= 100"
        >添加</el-button
      >
      <el-button icon="el-icon-download" v-if="false">下载</el-button>
    </div>
    <table-area
      :loading="loading"
      :page="page"
      :size="size"
      :total="total"
      :list="list"
      @current-change="currentChange"
      @size-change="sizeChange"
      @edit="edit"
      @del="del"
      @perm="perm"
      @menu="menu"
    />
    <edit-modal :show="editModal" :info="editModalInfo" @close="close" />
    <perm-modal :info="permModal" @close="perm(null)" />
    <menu-modal :info="menuModal" @close="menu(null)" />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
// lib
// components & widgets
import PageTableVm from "@/public/base/PageTableVm";
import TableArea from "./TableArea.vue";
import EditModal from "./EditModal.vue";
import PermModal from "./PermModal.vue";
import MenuModal from "./MenuModal.vue";
// config
// script & public
import logUtils from "@/utils/logUtils";
// controller & service
import { delRoleService, getRolePageService } from "@/biz/role/service";
// interface
import { Role } from "@/biz/role/model";
// 其它

@Component({
  components: {
    TableArea,
    EditModal,
    PermModal,
    MenuModal,
  },
})
export default class SystemRole extends PageTableVm {
  form: {
    name: string;
    code: string;
  } = {
    name: "",
    code: "",
  };
  permModal: Role | null = null;
  menuModal: Role | null = null;
  mounted() {
    this.getPage();
  }
  async getPage() {
    logUtils.info("搜索项", JSON.stringify(this.form));
    // 调用服务
    this.loading = true;
    const result = await getRolePageService({
      pageNum: this.page,
      pageSize: this.size,
      sysRoleCode: this.form.code,
      sysRoleName: this.form.name,
    });
    this.loading = false;
    if (result.payload) {
      this.list = result.payload.list;
      this.total = result.payload.total;
    }
    // 失败和异常
  }
  async del(row: Role) {
    const result = await delRoleService(row.id);
    // 成功
    if (result.payload) {
      this.$message.success("删除成功");
      this.getPage();
    }
    // 失败和异常
  }
  perm(row: Role | null) {
    this.permModal = row;
  }
  menu(row: Role | null) {
    this.menuModal = row;
  }
}
</script>

<style lang="scss">
</style>
