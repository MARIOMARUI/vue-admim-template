<template>
  <el-upload
    class="file-uploader"
    action=""
    :http-request="httpRequest"
    :multiple="limit > 1"
    :limit="limit"
    :file-list="fileList"
    :show-file-list="showFileList"
    :disabled="disabled || loading"
    :accept="acceptStr"
    :before-upload="handleBeforeUpload"
    :on-exceed="onExceed"
    :on-success="onSuccess"
    :on-change="onChange"
    :on-error="onError"
  >
    <el-button :icon="icon">{{ title }}</el-button>
    <div slot="tip" class="el-upload__tip" v-if="showFileList">
      只能上传{{ acceptStr }}文件，且不超过{{ maxSize }}MB
    </div>
  </el-upload>
</template>

<script lang="ts">
import {
  Component,
  Emit,
  Inject,
  Prop,
  Vue,
  Watch,
} from "vue-property-decorator";
// lib
// components & widgets
// config
// script
import logUtils from "@/utils/logUtils";
import fsUtils, { FileType } from "@/utils/fsUtils";
// controller & service
import uploadService from "@/public/service/upload.service";
// interface
import {
  ElUploadInternalFileDetail,
  ElUploadInternalRawFile,
  FileListItem,
  HttpRequestOptions,
} from "element-ui/types/upload";
import { ItemFileUpload } from "@/biz/file/api";
// 其它

/**
 * 备注
 * 自定义上传时, action也不能省略,使用一个空字符串占位
 * 上传字段名约定为file,不另行提供配置
 * 上传组件在表单中不会自动效验,这里添加了自动效验
 * 上传尺寸在config/setting里面设置
 */

@Component
export default class FileUploader extends Vue {
  @Prop({ default: 1 }) private limit!: number;
  @Prop({ default: "点击上传" }) private title!: string;
  @Prop({ default: "" }) private icon!: string;
  @Prop({ default: false }) private disabled!: boolean;
  @Prop({ default: true }) private showFileList!: boolean;
  @Prop({ default: "all" }) private accept!: string; // "image,video,excel,office,pdf,compression,all"
  @Prop(Array) value!: string[] | undefined;
  @Prop(Function) beforeUpload!: (file: ElUploadInternalRawFile) => void;
  @Inject({ from: "elFormItem", default: undefined }) readonly elFormItem!: any;
  loading = false;
  fileList: FileListItem[] = [];
  mounted() {
    this.onChangeValue(this.value);
  }
  @Watch("value")
  onChangeValue(newVal?: string[]) {
    if (!newVal) return;
    const result: FileListItem[] = [];
    newVal.forEach((el) => {
      const item: FileListItem = {
        name: fsUtils.getFileNameFormUrl(el),
        url: el,
      };
      result.push(item);
    });
    this.fileList = result;
  }
  @Emit("input")
  onSuccess(
    data: ItemFileUpload[],
    file: ElUploadInternalFileDetail,
    list: ElUploadInternalFileDetail[],
  ) {
    logUtils.info("ImageUploader onSuccess", data, file, list);
    this.loading = false;
    const [first] = data;
    if (first) {
      this.elFormItem && this.elFormItem.clearValidate(); // 清除验证
      this.fileList = list as any;
    }
    return this.fileList;
  }
  @Emit("change")
  onChange(file: ElUploadInternalFileDetail) {
    return file;
  }
  onError(err: ErrorEvent) {
    logUtils.info("ImageUploader onError", err);
    this.loading = false;
    this.$message.error(err.type);
  }
  handleBeforeUpload(file: ElUploadInternalRawFile) {
    const check = fsUtils.limit(file, this.acceptArr);
    if (this.beforeUpload) {
      this.beforeUpload(file);
      return false;
    }
    return check;
  }
  onExceed() {
    this.$message.warning(`当前限制上传 ${this.limit} 个文件`);
  }
  httpRequest(options: HttpRequestOptions) {
    logUtils.info("ImageUploader httpRequest", options);
    this.loading = true;
    uploadService.eleUploadRequest(options);
  }
  get acceptArr() {
    return this.accept.split(",") as FileType[];
  }
  get acceptStr() {
    return fsUtils.getAcceptStr(this.acceptArr);
  }
  get maxSize() {
    return fsUtils.getFileMaxSize(this.acceptArr);
  }
}
</script>

<style scoped lang="scss">
.file-uploader {
  display: inline-block;
}
</style>
