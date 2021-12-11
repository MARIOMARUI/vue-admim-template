<template>
  <div class="content-main">
    <div>
      <el-form :inline="true" :model="form" ref="form">
        <el-form-item label="时间">
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="至"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDatePicker"
          >
          </el-date-picker
        ></el-form-item>
      </el-form>
    </div>
    <div class="content-search">
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
      <el-button icon="el-icon-refresh-right" @click="reset">重置</el-button>
    </div>
    <div class="content-edit">
      <!-- <el-button type="primary" icon="el-icon-plus" @click="add">添加</el-button> -->
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
import { delOperationLogService, getOperationLogPageService } from "@/biz/operationLog/service";
// interface
import { OperationLog } from "@/biz/operationLog/model";
// 其它

@Component({
  components: {
    TableArea,
    EditModal,
  },
})
export default class SystemOperationLog extends PageTableVm {
  dateValue: Array<string> = [];
  form: {} = {};
  mounted() {
    this.getPage();
  }
  async getPage() {
    logUtils.info("搜索项", JSON.stringify(this.form));
    // 调用服务
    this.loading = true;
    const result = await getOperationLogPageService({
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
  async del(row: OperationLog) {
    const result = await delOperationLogService(row.id);
    // 成功
    if (result.payload) {
      this.$message.success("删除成功");
      this.getPage();
    }
    // 失败和异常
  }
  changeDatePicker(e: any) {
    logUtils.log(e);
    this.form = {
      startTime: e[0],
      endTime: e[1],
    };
  }
}
</script>

<style lang="scss"></style>
