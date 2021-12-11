<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible="show"
    :before-close="cancel"
  >
    <el-form label-width="150px" inline :model="form" ref="form" :rules="rules">
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="form.companyName" placeholder="公司名称" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="cancel" icon="el-icon-close">取消</el-button>
      <el-button
        type="primary"
        :active-value="1"
        :inactive-value="0"
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
import AreaCascader from "@/components/AreaCascader.vue";
import ImageUploader from "@/components/Uploader/ImageUploader.vue";
// config
// script
import logUtils from "@/utils/logUtils";
// controller & service
import {
  addCompanyListService,
  updateCompanyListService,
} from "@/biz/companyList/service";
// interface
import { CompanyList } from "@/biz/companyList/model";
// 其它

@Component({
  components: {
    AreaCascader,
    ImageUploader,
  },
})
export default class EditModal extends Vue {
  @Prop(Boolean) show!: boolean;
  @Prop(Object) info!: CompanyList | null;
  title = "";
  loading = false;
  form: {
    companyName: string;
  } = {
    companyName: "",
  };
  rules = {
    companyName: [
      {
        required: true,
        message: "请输入公司名称",
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
    if (newVal) {
      const form: any = this.$refs.form;
      form && form.resetFields();
      this.title = this.info ? "编辑公司" : "添加公司";
      // 设置简单值
      this.form.companyName = this.info?.companyName || "";

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
    const result = await addCompanyListService({
      ...this.form,
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
    const result = await updateCompanyListService({
      ...this.form,
      companyId: String(this.info.companyId),
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

<style lang="scss" scoped>
.el-input,
.el-select,
.el-cascader {
  width: 186px;
}
</style>
