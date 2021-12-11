<template>
  <div class="content-main">
    <div>
      <el-form :inline="true" :model="form" ref="form">
        <el-form-item label="用户名" prop="sysUserName">
          <el-input v-model="form.sysUserName" placeholder="请输入用户名" />
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
        v-permission="['ADMIN_ADD']"
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
      @edit-role="editRole"
    />
    <edit-modal :show="editModal" :info="editModalInfo" @close="close" />
    <role-modal :info="roleModal" @close="editRole" />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
// lib
import PageTableVm from "@/public/base/PageTableVm";
// components & widgets
import TableArea from "./TableArea.vue";
import EditModal from "./EditModal.vue";
import RoleModal from "./RoleModal.vue";
// config
// script & public
import logUtils from "@/utils/logUtils";
// controller & service
import { delAdminService, getAdminPageService } from "@/biz/admin/service";
// interface
import { Admin } from "@/biz/admin/model";
import { ROOT_ADMIN_ID } from "@/config/setting";
// 其它

@Component({
  components: {
    TableArea,
    EditModal,
    RoleModal,
  },
})
export default class SystemAdmin extends PageTableVm {
  form: {
    sysUserName: string;
  } = {
    sysUserName: "",
  };
  roleModal: Admin | null = null;
  villageModal: any = null;
  mounted() {
    this.getPage();
  }
  async getPage() {
    logUtils.info("搜索项", JSON.stringify(this.form));
    // 调用服务
    this.loading = true;
    const result = await getAdminPageService({
      pageNum: this.page,
      pageSize: this.size,
      sysUserName: this.form.sysUserName,
    });
    this.loading = false;
    if (result.payload) {
      this.list = result.payload.list;
      this.total = result.payload.total;
    }
    // 失败和异常
  }
  async del(row: Admin) {
    if (row.sysUserId === ROOT_ADMIN_ID) {
      this.$message.warning("不能删除根管理员");
      return;
    }
    const result = await delAdminService(row.sysUserId);
    // 成功
    if (result.payload) {
      this.$message.success("删除成功");
      this.getPage();
    }
    // 失败和异常
  }
  editRole(row: Admin | null) {
    if (row && row.sysUserId === ROOT_ADMIN_ID) {
      this.$message.warning("根管理员不需设置角色");
      return;
    }
    this.roleModal = row;
  }
}
</script>

<style lang="scss">
</style>
