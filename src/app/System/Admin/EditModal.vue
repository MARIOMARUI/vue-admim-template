<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible="show"
    :before-close="cancel"
  >
    <el-form label-width="100px" :model="form" inline ref="form" :rules="rules">
      <el-form-item label="账户名称" prop="sysUserName">
        <el-input v-model="form.sysUserName" />
      </el-form-item>
      <el-form-item label="账户密码" prop="sysUserPass">
        <el-input v-model="form.sysUserPass" type="password" show-password />
      </el-form-item>
      <el-form-item label="姓名" prop="fullName">
        <el-input v-model="form.fullName" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="家庭地址" prop="homeAddress">
        <el-input v-model="form.homeAddress" />
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker
          v-model="form.birthday"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="公司" prop="companyId">
        <el-select v-model="form.companyId" placeholder="请选择">
          <el-option
            v-for="item in companyOptions"
            :key="item.companyId"
            :label="item.companyName"
            :value="item.companyId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-select v-model="form.deptId" placeholder="请选择">
          <el-option
            v-for="item in departmentOptions"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptId"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :model="form" inline ref="form" :rules="rules">
      <el-form-item label="是否是超级管理员" prop="isAdmin">
        <el-radio-group v-model="form.isAdmin">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="cancel" icon="el-icon-close">取消</el-button>
      <el-button
        type="primary"
        icon="el-icon-check"
        @click="submit"
        :loading="loading"
        >确定</el-button
      >
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
// lib
// components & widgets
// config
// script
import logUtils from "@/utils/logUtils";
// controller & service
import {
  addAdminService,
  updateAdminService,
  getCompanylistService,
  getDepartmentlistService,
} from "@/biz/admin/service";
// interface
import { Admin, Companylist, Departmentlist } from "@/biz/admin/model";
// 其它

@Component
export default class EditModal extends Vue {
  @Prop(Boolean) show!: boolean;
  @Prop(Object) info!: Admin | null;
  title = "";
  loading = false;
  form: {
    companyId: string;
    deptId: string;
    mobile: string;
    sysUserName: string;
    sysUserPass: string;
    birthday: string;
    sex: string;
    homeAddress: string;
    fullName: string;
    isAdmin: boolean;
  } = {
    companyId: "",
    deptId: "",
    mobile: "",
    sysUserName: "",
    sysUserPass: "",
    birthday: "",
    sex: "",
    homeAddress: "",
    fullName: "",
    isAdmin: false,
  };
  departmentOptions: Departmentlist[] = [];
  companyOptions: Companylist[] = [];
  rules = {
    companyId: [
      {
        required: true,
        message: "请选择公司",
      },
    ],
    deptId: [
      {
        required: true,
        message: "请选择部门",
      },
    ],
    mobile: [
      {
        required: true,
        message: "请输入管理员手机号",
        min: 11,
        max: 11,
      },
    ],
    fullName: [
      {
        required: true,
        message: "请输入管理员姓名",
      },
    ],
    sex: [
      {
        required: true,
        message: "请输入选择性别",
      },
    ],
    sysUserName: [
      {
        required: true,
        message: "请输入账户名",
        min: 6,
        max: 20,
      },
    ],
    sysUserPass: [
      {
        required: true,
        message: "请输入账号密码",
        min: 6,
        max: 20,
      },
    ],
  };
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
    this.getCompanylist();
    this.getDepartmentlist();
    if (newVal) {
      const form: any = this.$refs.form;
      form && form.resetFields();
      this.title = this.info ? "编辑管理员账户" : "添加管理员账户";
      // 设置简单值
      this.form.sysUserName = this.info?.sysUserName || "";
      this.form.sysUserPass = this.info?.sysUserPass || "";
      this.form.companyId = this.info?.companyId || "";
      this.form.deptId = this.info?.deptId || "";
      this.form.mobile = this.info?.mobile || "";
      this.form.sex = this.info?.sex || "";
      this.form.fullName = this.info?.fullName || "";
      this.form.homeAddress = this.info?.homeAddress || "";
      this.form.birthday = this.info?.birthday || "";
      // 设置复杂值
      if (this.info) {
        // TODO
      }
    }
  }
  submit() {
    const form: any = this.$refs.form;
    logUtils.info("提交表单", JSON.stringify(this.form));
    form.validate((valid: boolean) => {
      if (!valid) return;
      if (this.info) {
        this.edit();
      } else {
        this.add();
      }
    });
  }
  async add() {
    this.loading = true;
    const result = await addAdminService({
      ...this.form,
      sysUserName: this.form.sysUserName.trim(),
      sysUserPass: this.form.sysUserPass.trim(),
    });
    this.loading = false;
    // 成功
    if (result.payload) {
      this.$message.success("添加成功");
      this.ok();
    }
    // 失败和异常
  }
  async edit() {
    if (!this.info) return;
    this.loading = true;
    const result = await updateAdminService({
      id: this.info.sysUserId,
      sysUserName: this.form.sysUserName.trim(),
      sysUserPass: this.form.sysUserPass.trim(),
    });
    this.loading = false;
    // 成功
    if (result.payload) {
      this.$message.success("更新成功");
      this.ok();
    }
    // 失败和异常
  }
  // 获取公司列表
  async getCompanylist() {
    const result = await getCompanylistService({});
    if (result.payload) {
      this.companyOptions = result.payload;
    }
  }
  // 获取部门列表
  async getDepartmentlist() {
    const result = await getDepartmentlistService({});
    if (result.payload) {
      this.departmentOptions = result.payload;
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input,
.el-select,
.el-cascader,
.el-radio-group {
  width: 186px;
}
</style>
