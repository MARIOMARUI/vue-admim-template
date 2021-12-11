<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible="show"
    :before-close="cancel"
  >
    <el-form label-width="150px" inline :model="form" ref="form" :rules="rules">
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="form.deptName" placeholder="部门名称" />
      </el-form-item>
      <el-form-item label="所属公司" prop="companyId">
        <el-select v-model="form.companyId" placeholder="请选择">
          <el-option
            v-for="item in companyOptions"
            :key="item.companyId"
            :label="item.companyName"
            :value="item.companyId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级部门" prop="deptPId">
        <el-cascader
          v-model="form.deptPId"
          :options="departmentOptions"
          :props="props"
        ></el-cascader>
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
  addCompanyDepartmentService,
  updateCompanyDepartmentService,
  getChildrenService,
} from "@/biz/companyDepartment/service";
import {
  getCompanylistService,
  getDepartmentlistService,
} from "@/biz/admin/service";
// interface
import { CompanyDepartment } from "@/biz/companyDepartment/model";
// 其它

@Component({
  components: {
    AreaCascader,
    ImageUploader,
  },
})
export default class EditModal extends Vue {
  @Prop(Boolean) show!: boolean;
  @Prop(Object) info!: CompanyDepartment | null;
  title = "";
  loading = false;
  form: {
    deptName: string;
    companyId: string;
    deptPId: string;
  } = {
    deptName: "",
    companyId: "",
    deptPId: "",
  };
  departmentOptions: any = [];
  companyOptions: any = [];
  props: any = {
    lazy: true,
    async lazyLoad(node: any, resolve: any) {
      const { value } = node;
      if (!value) return;
      //  请求下级部门
      const result = await getChildrenService({
        deptPId: value,
      });
      if (result.payload) {
        const nodes = result.payload.map((item: any) => {
          return {
            value: item.deptId,
            label: item.deptName,
          };
        });
        resolve(nodes);
      }
    },
  };
  rules = {
    deptName: [
      {
        required: true,
        message: "请输入部门",
      },
    ],
    // companyId: [
    //   {
    //     required: true,
    //     message: "请选择公司",
    //   },
    // ],
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
      this.title = this.info ? "编辑部门" : "添加部门";
      // 设置简单值
      this.form.deptName = this.info?.deptName || "";
      this.form.companyId = this.info?.companyId || "";
      this.form.deptPId = this.info?.deptPId || "";

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
    const result = await addCompanyDepartmentService({
      ...this.form,
      deptPId: this.form.deptPId[this.form.deptPId.length - 1] || "0",
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
    const result = await updateCompanyDepartmentService({
      ...this.form,
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
  // 获取公司列表
  async getCompanylist() {
    const result = await getCompanylistService({});
    if (result.payload) {
      this.companyOptions = result.payload;
    }
  }
  // 获取一级部门列表
  async getDepartmentlist() {
    const result = await getDepartmentlistService({});
    if (result.payload) {
      const arr = result.payload.map((item: any) => {
        return {
          value: item.deptId,
          label: item.deptName,
        };
      });
      this.departmentOptions = arr;
    }
  }
}
</script>

<style lang="scss" scoped>
.el-date-editor.el-input,
.el-cascader,
.el-select {
  width: 186px;
}
</style>
