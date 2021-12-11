<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible="show"
    :before-close="cancel"
  >
    <el-form label-width="100px" :model="form" ref="form" :rules="rules">
      <el-form-item label="菜单URL" prop="name">
        <el-input v-model="form.name" />
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
// script & utils & public
import logUtils from "@/utils/logUtils";
// controller & service & logic
import {
  addOperationLogService,
  updateOperationLogService,
} from "@/biz/operationLog/service";
// interface
import { OperationLog } from "@/biz/operationLog/model";
// 其它

@Component
export default class EditModal extends Vue {
  @Prop(Boolean) show!: boolean;
  @Prop(Object) info!: OperationLog | null;
  title = "";
  loading = false;
  OperationLog = "";
  form: {
    name: string;
  } = {
    name: "",
  };
  rules = {
    name: [{ required: true, message: "请输入菜单URL" }],
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
    if (newVal) {
      const form: any = this.$refs.form;
      form && form.resetFields();
      this.title = this.info ? "编辑菜单" : "添加菜单";
      // 设置简单值
      this.OperationLog = "";
      this.form.name = this.info?.name || "";
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
    const result = await addOperationLogService({});
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
    const result = await updateOperationLogService({
      name: this.info.name,
      id: this.info.id,
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

<style lang="scss"></style>
