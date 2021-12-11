<template>
  <div class="content-table">
    <el-table stripe :data="list" border v-loading="loading">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="operationCreateTime" label="操作时间"></el-table-column>
      <el-table-column prop="operationDesc" label="操作描述"></el-table-column>
      <el-table-column prop="operationIp" label="请求IP"></el-table-column>
      <el-table-column prop="operationMethod" label="操作方法"></el-table-column>
      <el-table-column prop="operationModular" label="功能模块"></el-table-column>
      <el-table-column prop="operationRequestParam" label="请求参数"></el-table-column>
      <!-- <el-table-column prop="operationRespParam" label="返回参数"></el-table-column> -->
      <el-table-column prop="operationType" label="操作类型"></el-table-column>
      <el-table-column prop="operationUri" label="请求URI"></el-table-column>
      <!-- <el-table-column prop="operationUserId" label="操作员ID"></el-table-column> -->
      <el-table-column prop="operationUserName" label="操作员名称"></el-table-column>
      <!-- <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除该记录吗？" class="ml-10" @confirm="del(scope.row)">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>-->
    </el-table>
    <div class="content-pagination">
      <el-pagination
        :layout="pagination.layout"
        :page-sizes="pagination.pageSizes"
        :current-page="page"
        :page-size="size"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
// lib
// components & widgets
import PageTableAreaVm from "@/public/base/PageTableAreaVm";
// config
// script & public
// controller & service
// interface
// 其它

@Component
export default class TableArea extends PageTableAreaVm {}
</script>

<style lang="scss"></style>
