/**
 * @Date 2021-01-05 17:16:15
 * @Remark 不要在这里写生命周期方法
 */

// lib
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
// config
import { TABLE_SETTING } from "@/config/setting";
// script & methods & public
// biz
// store
// service
// interface && type
// 其它

@Component
export default class PageTableAreaVm extends Vue {
  @Prop(Boolean) loading!: boolean;
  @Prop(Number) page!: number;
  @Prop(Number) size!: number;
  @Prop(Number) total!: number;
  @Prop(Array) list!: any[];
  pagination = TABLE_SETTING.PAGINATION;
  @Emit()
  currentChange(current: number) {
    return current;
  }
  @Emit()
  sizeChange(size: number) {
    return size;
  }
  @Emit()
  edit(row: any) {
    return row;
  }
  @Emit()
  del(row: any) {
    return row;
  }
}
