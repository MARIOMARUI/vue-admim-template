<template>
  <div class="content-table">
    <el-table
      :data="list"
      stripe
      border
      v-loading="loading"
      lazy
      :load="load"
      row-key="deptId"
      :tree-props="{ children: 'children', hasChildren: 'deptId' }"
    >
      <!-- <el-table-column align="center" prop="deptId" label="ID"></el-table-column> -->
      <el-table-column align="center" prop="companyId" label="公司ID"></el-table-column>
      <el-table-column align="center" prop="deptName" label="部门名称"></el-table-column>
      <el-table-column align="center" prop="deptPId" label="上级ID"></el-table-column>
      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <!-- <el-popconfirm title="确定删除该记录吗？" class="ml-10" @confirm="del(scope.row)">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>-->
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
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit } from "vue-property-decorator";
// lib
// components & widgets
import PageTableAreaVm from "@/public/base/PageTableAreaVm";
// config
// script & public
// controller & service
// interface
// 其它

@Component
export default class TableArea extends PageTableAreaVm {
  @Emit("load")
  async load(tree: any, treeNode: any, resolve: any) {
    return {
      tree,
      treeNode,
      resolve,
    };
  }
}
</script>

<style lang="scss"></style>
