<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible="show"
    :before-close="cancel"
  >
    <el-form label-width="100px" :model="form" ref="form" :rules="rules">
      <el-form-item label="快速选择">
        <el-select
          v-model="menu"
          class="w-100"
          placeholder="请选择要添加的菜单"
          :disabled="!!info"
          @change="menuChange"
        >
          <el-option
            v-for="item in options"
            :key="item.uuid"
            :label="item.title"
            :value="JSON.stringify(item)"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="菜单代码" prop="code">
        <el-input v-model="codeUpper" />
      </el-form-item>
      <el-form-item label="菜单URL" prop="url">
        <el-input v-model="form.url" />
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
  addMenuService,
  getMenuListService,
  updateMenuService,
} from "@/biz/menu/service";
import { getRoutersList } from "./logic";
// interface
import { Menu } from "@/biz/menu/model";
import { MenuOption } from "./model";
// 其它

@Component
export default class EditModal extends Vue {
  @Prop(Boolean) show!: boolean;
  @Prop(Object) info!: Menu | null;
  title = "";
  loading = false;
  options: MenuOption[] = [];
  menu = "";
  form: {
    name: string;
    code: string;
    url: string;
  } = {
    name: "",
    code: "",
    url: "",
  };
  rules = {
    name: [{ required: true, message: "请输入菜单名称" }],
    code: [{ required: true, message: "请输入菜单代码" }],
    url: [{ required: true, message: "请输入菜单URL" }],
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
  onChangeValue(newVal: boolean) {
    if (newVal) {
      const form: any = this.$refs.form;
      form && form.resetFields();
      this.title = this.info ? "编辑菜单" : "添加菜单";
      // 设置简单值
      this.menu = "";
      this.form.name = this.info?.sysMenuName || "";
      this.form.code = this.info?.sysMenuCode || "";
      this.form.url = this.info?.sysMenuUrl || "";
      // 设置复杂值
      if (this.info) {
        // TODO
      } else {
        this.setMenuOptions();
      }
    }
  }
  async setMenuOptions() {
    const result = await getMenuListService();
    if (result.payload) {
      const list = result.payload.list;
      const can = getRoutersList().filter((el) => {
        const item = list.find((it) => it.sysMenuCode === el.code);
        return !item;
      });
      this.options = can;
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
    const result = await addMenuService({
      sysMenuCode: this.form.code.trim(),
      sysMenuName: this.form.name.trim(),
      sysMenuUrl: this.form.url.trim(),
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
    const result = await updateMenuService({
      id: this.info.id,
      sysMenuCode: this.form.code.trim(),
      sysMenuName: this.form.name.trim(),
      sysMenuUrl: this.form.url.trim(),
    });
    this.loading = false;
    // 成功
    if (result.payload) {
      this.$message.success("更新成功");
      this.ok();
    }
    // 失败和异常
  }
  menuChange(el: string) {
    const obj: MenuOption = JSON.parse(el);
    this.form.name = obj.title;
    this.form.code = obj.code;
    this.form.url = obj.path;
  }
}
</script>

<style lang="scss">
</style>
