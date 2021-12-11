<template>
  <div class="content-main">
    <div>
      <el-form :inline="true" :model="form" ref="form">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name" placeholder="菜单名称" />
        </el-form-item>
        <el-form-item label="菜单代码" prop="code">
          <el-input v-model="form.code" placeholder="菜单代码" />
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
    />
    <edit-modal :show="editModal" :info="editModalInfo" @close="close" />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
// lib
import PageTableVm from "@/public/base/PageTableVm";
// components & widgets
import TableArea from "./TableArea.vue";
import EditModal from "./EditModal.vue";
// config
// script & public
import logUtils from "@/utils/logUtils";
// controller & service
import { delMenuService, getMenuPageService } from "@/biz/menu/service";
// interface
import { Menu } from "@/biz/menu/model";
// 其它

@Component({
  components: {
    TableArea,
    EditModal,
  },
})
export default class SystemMenu extends PageTableVm {
  form: {
    name: string;
    code: string;
  } = {
    name: "",
    code: "",
  };
  mounted() {
    this.getPage();
  }
  async getPage() {
    logUtils.info("搜索项", JSON.stringify(this.form));
    // 调用服务
    this.loading = true;
    const result = await getMenuPageService({
      pageNum: this.page,
      pageSize: this.size,
      sysMenuCode: this.form.code,
      sysMenuName: this.form.name,
    });
    this.loading = false;
    if (result.payload) {
      this.list = result.payload.list;
      this.total = result.payload.total;
    }
    // 失败和异常
  }
  async del(row: Menu) {
    const result = await delMenuService(row.id);
    // 成功
    if (result.payload) {
      this.$message.success("删除成功");
      this.getPage();
    }
    // 失败和异常
  }
}
</script>

<style lang="scss">
</style>
