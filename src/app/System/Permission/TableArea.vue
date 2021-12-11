<template>
  <div class="content-table">
    <el-table stripe :data="list" border v-loading="loading">
      <el-table-column prop="id" width="50" label="ID"></el-table-column>
      <el-table-column prop="sysPermName" label="权限名称"></el-table-column>
      <el-table-column prop="sysPermCode" label="权限代码"></el-table-column>
      <el-table-column prop="sysPermUrl" label="URL"></el-table-column>
      <el-table-column
        prop="sysPermDescription"
        label="权限说明"
      ></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" v-if="false">查看</el-button>
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-popconfirm
            title="确定删除该记录吗？"
            class="ml-10"
            @confirm="del(scope.row)"
          >
            <el-button size="mini" type="danger" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
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
      >
      </el-pagination>
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

<style lang="scss">
</style>
