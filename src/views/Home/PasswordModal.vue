<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible="show"
    :before-close="cancel"
    append-to-body
  >
    <el-form label-width="150px" :model="form" ref="form" :rules="rules">
      <el-form-item label="账户旧密码" prop="oldPwd">
        <el-input v-model="form.oldPwd" type="password" show-password />
      </el-form-item>
      <el-form-item label="账户新密码" prop="newPwd1">
        <el-input v-model="form.newPwd1" type="password" show-password />
      </el-form-item>
      <el-form-item label="再次输入新密码" prop="newPwd2">
        <el-input v-model="form.newPwd2" type="password" show-password />
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
import { updatePwdService } from "@/biz/authorize/service";
// interface
import { StoreState } from "@/store";
// 其它

const rule = {
  required: true,
  message: "请输入管理员账户密码，6-20位",
  min: 6,
  max: 20,
};

@Component
export default class EditModal extends Vue {
  // prop & method
  @Prop(Boolean) show!: boolean;
  // @close (Boolean) => void;
  // state
  title = "";
  loading = false;
  form: {
    oldPwd: string;
    newPwd1: string;
    newPwd2: string;
  } = {
    oldPwd: "",
    newPwd1: "",
    newPwd2: "",
  };
  rules = {
    oldPwd: [rule],
    newPwd1: [rule],
    newPwd2: [rule],
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
      this.title = `修改${this.account.username}的密码`;
      // 设置简单值
      this.form.oldPwd = "";
      this.form.newPwd1 = "";
      this.form.newPwd2 = "";
    }
  }
  submit() {
    const form: any = this.$refs.form;
    logUtils.info("提交表单", JSON.stringify(this.form));
    form.validate((valid: boolean) => {
      if (!valid) return;
      if (this.form.newPwd1 !== this.form.newPwd2) {
        this.$message.warning("新旧密码不一致");
        return;
      }
      this.edit();
    });
  }
  async edit() {
    this.loading = true;
    const result = await updatePwdService(this.form.oldPwd, this.form.newPwd2);
    this.loading = false;
    // 成功
    if (result.payload) {
      this.$message.success("修改密码成功，3秒后重新登录");
      this.ok();
    }
    // 失败和异常
  }
  get account() {
    const state: StoreState = this.$store.state;
    return state.account.account;
  }
}
</script>

<style lang="scss">
</style>
