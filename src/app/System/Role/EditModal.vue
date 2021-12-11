<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible="show"
    :before-close="cancel"
  >
    <el-form label-width="100px" :model="form" ref="form" :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="角色代码" prop="code">
        <el-input v-model="codeUpper" />
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
import { addRoleService, updateRoleService } from "@/biz/role/service";
// interface
import { Role } from "@/biz/role/model";
// 其它

@Component
export default class EditModal extends Vue {
  @Prop(Boolean) show!: boolean;
  @Prop(Object) info!: Role | null;
  title = "";
  loading = false;
  form: {
    name: string;
    code: string;
  } = {
    name: "",
    code: "",
  };
  rules = {
    name: [{ required: true, message: "请输入角色名称" }],
    code: [{ required: true, message: "请输入角色代码" }],
  };
  get codeUpper() {
    return this.form.code;
  }
  set codeUpper(value: string) {
    this.form.code = value.toLocaleUpperCase();
  }
  @Emit("close")
  cancel() {
    return false;
  }
  @Emit("close")
  ok() {
    return true;
  }
  @Watch("show")
  onChangeValue(newVal: string) {
    if (newVal) {
      const form: any = this.$refs.form;
      form && form.resetFields();
      this.title = this.info ? "编辑角色" : "添加角色";
      // 设置简单值
      this.form.name = this.info?.sysRoleName || "";
      this.form.code = this.info?.sysRoleCode || "";
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
    const result = await addRoleService({
      sysRoleName: this.form.name.trim(),
      sysRoleCode: this.form.code.trim(),
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
    const result = await updateRoleService({
      id: this.info.id,
      sysRoleName: this.form.name.trim(),
      sysRoleCode: this.form.code.trim(),
    });
    this.loading = false;
    // 成功
    if (result.payload) {
      this.$message.success("更新成功");
      this.ok();
    }
    // 失败和异常
  }
}
</script>

<style lang="scss">
</style>
