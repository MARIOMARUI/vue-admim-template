/**
 * @Date 2021-01-05 17:16:15
 * @Remark 不要在这里写生命周期方法
 */

// lib
import { Component, Vue } from "vue-property-decorator";
// config
import { TABLE_SETTING } from "@/config/setting";
// script & methods & public
import logUtils from "@/utils/logUtils";
// biz
// store
// service
// interface && type
import { PageTable } from "../model/base";
// 其它

@Component
export default class PageTableVm extends Vue implements PageTable<any> {
  page = TABLE_SETTING.PAGE;
  size = TABLE_SETTING.SIZE;
  loading = false;
  total = 0;
  list: any[] = [];
  editModal = false;
  editModalInfo = null;
  editModalLoading = false;
  getPage() {
    logUtils.warn("PageTableVmBase", "具体业务覆盖此默认方法");
  }
  search() {
    this.page = TABLE_SETTING.PAGE;
    this.getPage();
  }
  reset() {
    this.page = TABLE_SETTING.PAGE;
    const form: any = this.$refs.form;
    if (form) {
      form.resetFields();
    }
    this.search();
  }
  add() {
    this.editModal = true;
  }
  edit(row: any) {
    logUtils.info("编辑行", row);
    this.editModalInfo = row;
    this.editModal = true;
  }
  close(ok: boolean) {
    this.editModalInfo = null;
    this.editModal = false;
    // 提交时请求新数据
    if (ok) {
      this.getPage();
    }
  }
  del(row: any) {
    logUtils.info("删除行", row);
    logUtils.warn("PageTableVmBase", "具体业务覆盖此默认方法");
  }
  currentChange(current: number) {
    if (this.page === current) return;
    this.page = current;
    this.getPage();
  }
  sizeChange(size: number) {
    this.page = TABLE_SETTING.PAGE;
    this.size = size;
    this.getPage();
  }
}
