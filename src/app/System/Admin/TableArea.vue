<template>
  <div class="content-table">
    <el-table stripe :data="list" border v-loading="loading">
      <el-table-column align="center" prop="sysUserId" label="ID"></el-table-column>
      <el-table-column align="center" prop="sysUserName" label="用户名"></el-table-column>
      <el-table-column align="center" prop="fullName" label="姓名"></el-table-column>
      <el-table-column align="center" prop="mobile" label="手机号"></el-table-column>
      <el-table-column align="center" prop="homeAddress" label="住址"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别">
        <template slot-scope="scope">{{scope.row.sex?'男':'女'}}</template>
      </el-table-column>
      <el-table-column align="center" prop="companyName" label="公司"></el-table-column>
      <el-table-column align="center" prop="deptName" label="部门"></el-table-column>
      <el-table-column align="center" prop="gmtCreate" label="创建时间"></el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="editRole(scope.row)">角色</el-button>
          <!-- <el-button size="mini" @click="edit(scope.row)">编辑</el-button> -->
          <el-popconfirm title="确定删除该记录吗？" class="ml-10" @confirm="del(scope.row)">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
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
import { Admin } from "@/biz/admin/model";
// 其它

@Component
export default class TableArea extends PageTableAreaVm {
  @Emit()
  editRole(row: Admin) {
    return row;
  }
}
</script>

<style lang="scss">
</style>
