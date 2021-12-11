<template>
  <el-cascader
    v-model="v"
    :options="options"
    :props="{ expandTrigger: 'hover' }"
    :clearable="clearable"
    @change="handleChange"
  />
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
// lib
// components & widgets
// config
// script & utils & public
// controller & service & logic
import { getAreaDataService } from "@/biz/area/service";
// interface
import { CascaderOption } from "element-ui/types/cascader";
// 其它

@Component
export default class AreaCascader extends Vue {
  @Prop(Array) value!: string[];
  @Prop({ default: true }) clearable!: boolean;
  options: CascaderOption[] = [];
  // 双向绑定的值不能直接使用props 需要引用一次不然会报错
  /*
    Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "value"
  */
  v = this.value;
  mounted() {
    this.getAreaData();
  }
  async getAreaData() {
    const result = await getAreaDataService();
    if (result.payload) {
      this.options = result.payload;
    }
  }
  @Emit("input")
  handleChange(value: string[]) {
    return value;
  }
}
</script>

<style scoped lang="scss"></style>
