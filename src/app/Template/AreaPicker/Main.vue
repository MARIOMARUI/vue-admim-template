<template>
  <div class="content-main">
    <h4 class="mb-10">默认封装的组件单独使用</h4>
    <area-cascader v-model="value" />
    <el-button class="ml-10" @click="showValue">查看</el-button>
    <h4 class="mt-10 mb-10">默认封装的组件在表单中使用</h4>
    <el-form label-width="100px" :model="form" ref="form" :rules="rules">
      <el-form-item label="测试地区" prop="area">
        <area-cascader v-model="form.area" />
      </el-form-item>
    </el-form>
    <el-button @click="submit">提交</el-button>
    <h4 class="mt-10 mb-10">原生组件的使用(定制化很高的场景)</h4>
    <el-cascader
      :options="options"
      :props="{ expandTrigger: 'hover' }"
      :clearable="true"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// lib
// components & widgets
import AreaCascader from "@/components/AreaCascader.vue";
// config
// script & public
import logUtils from "@/utils/logUtils";
// controller & service
import { getAreaDataService } from "@/biz/area/service";
// interface
import { CascaderOption } from "element-ui/types/cascader";
// 其它

@Component({
  components: {
    AreaCascader,
  },
})
export default class AreaPicker extends Vue {
  value: string[] = [];
  form: {
    area: string[];
  } = {
    area: [],
  };
  rules = {
    area: [{ required: true, type: "array", message: "请选择地区" }],
  };
  options: CascaderOption[] = [];
  mounted() {
    this.getAreaData();
  }
  async getAreaData() {
    const result = await getAreaDataService();
    if (result.payload) {
      this.options = result.payload;
    }
  }
  showValue() {
    logUtils.info("value", this.value);
  }
  submit() {
    const form: any = this.$refs.form;
    logUtils.info("提交表单", JSON.stringify(this.form));
    form.validate((valid: boolean) => {
      if (!valid) return;
      this.$message.success("提交成功");
    });
  }
  handleChange(value: string[]) {
    logUtils.info("value", value);
  }
}
</script>

<style lang="scss"></style>
