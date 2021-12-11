<template>
  <div class="content-main">
    <div>
      <el-form :inline="true" :model="form" ref="form">
        <!-- <el-form-item label="部门简称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="部门简称" />
        </el-form-item>-->
      </el-form>
    </div>
    <div class="content-search">
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
      <el-button icon="el-icon-refresh-right" @click="reset">重置</el-button>
    </div>
    <div class="content-edit">
      <el-button type="primary" icon="el-icon-plus" @click="add">添加</el-button>
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
      @load="load"
    />
    <edit-modal :show="editModal" :info="editModalInfo" @close="close" />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
// lib
import PageTableVm from "@/public/base/PageTableVm";
// components & widgets
import AreaCascader from "@/components/AreaCascader.vue";
import TableArea from "./TableArea.vue";
import EditModal from "./EditModal.vue";
// config
// script & public
import logUtils from "@/utils/logUtils";
// controller & service
import {
  delCompanyDepartmentService,
  getCompanyDepartmentPageService,
  getChildrenService,
} from "@/biz/companyDepartment/service";

// interface
import { CompanyDepartment } from "@/biz/companyDepartment/model";
// 其它

@Component({
  components: {
    TableArea,
    EditModal,
    AreaCascader,
  },
})

/* 小区列表 */
export default class CompanyDepartmentPage extends PageTableVm {
  form: {} = {};
  mounted() {
    this.getPage();
  }
  async getPage() {
    logUtils.info("搜索项", JSON.stringify(this.form));
    // 调用服务
    this.loading = true;
    const result = await getCompanyDepartmentPageService({
      ...this.form,
      pageNum: this.page,
      pageSize: this.size,
    });
    this.loading = false;
    if (result.payload) {
      this.list = result.payload.list;
      this.total = result.payload.total;
    }
    // 失败和异常
  }
  async del(row: CompanyDepartment) {
    const result = await delCompanyDepartmentService({
      id: String(row.id),
    });
    // 成功
    if (result.payload) {
      this.$message.success("删除成功");
      this.getPage();
    }
    // 失败和异常
  }
  // 懒加载二级分类
  async load(params: any) {
    const id = params.tree.deptId;
    // 将当前选中节点数据存储到map中
    // this.maps.set(id, { ...params });
    const result = await getChildrenService({
      deptPId: id,
    });
    if (result.payload) {
      setTimeout(() => {
        // 把二级分类的列表传入回调函数
        params.resolve(result.payload);
      }, 100);
    }
  }
}
</script>

<style lang="scss"></style>
