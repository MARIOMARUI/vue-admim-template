<template>
  <div>
    <el-upload
      class="image-uploader"
      action=""
      :http-request="httpRequest"
      :multiple="type === 'single' ? false : true"
      :limit="type === 'single' ? 1 : limit"
      :show-file-list="type === 'single' ? false : true"
      :disabled="disabled || loading"
      :list-type="listType"
      :file-list="fileList"
      :accept="acceptStr"
      :before-upload="handleBeforeUpload"
      :on-exceed="onExceed"
      :on-change="onChange"
      :on-success="onSuccess"
      :on-error="onError"
      :on-preview="onPreview"
      :on-remove="onRemove"
    >
      <i slot="default" class="el-icon-plus" v-if="type !== 'single'"></i>
      <div v-if="type === 'single'" class="show-box">
        <div v-if="!loading && url !== ''" class="show-box">
          <img :src="url" class="show-image" />
        </div>
        <i
          v-if="!loading && url === ''"
          class="el-icon-plus show-box show-icon"
        ></i>
        <i v-if="loading" class="el-icon-loading show-box show-icon"></i>
      </div>
    </el-upload>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialog"
      :append-to-body="true"
      title="预览图片"
    >
      <img class="img-res" :src="dialogUrl" :alt="dialogUrl" />
    </el-dialog>
  </div>
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
import fsUtils from "@/utils/fsUtils";
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
 * 自定义上传时, action也不能省略,使用一个空字符串占位
 * 上传字段名约定为file,不另行提供配置
 * 上传组件在表单中不会自动效验,这里添加了自动效验
 * 上传图片大小限制在config/setting里面设置
 */

@Component
export default class ImageUploader extends Vue {
  @Prop({ default: "single" }) public type!: "single" | "card";
  @Prop({ default: 1 }) public limit!: number;
  @Prop({ default: false }) public disabled!: boolean;
  @Prop(String) value!: string | undefined;
  @Inject({ from: "elFormItem", default: undefined }) readonly elFormItem!: any;
  loading = false;
  fileList: FileListItem[] = []; // 默认值
  initFlag = true;
  dialogUrl = "";
  dialog = false;
  mounted() {
    this.onChangeValue(this.value);
  }
  @Watch("value")
  onChangeValue(newVal?: string) {
    // 只执行一次,模拟同步值
    if (this.type === "card" && this.initFlag) {
      this.fileList = fsUtils.getFileList(newVal);
    }
  }
  @Emit("input")
  inputValue(value: string) {
    return value;
  }
  onSuccess(data: ItemFileUpload[]) {
    logUtils.info("ImageUploader onSuccess", data);
    this.initFlag = false;
    this.loading = false;
    this.elFormItem && this.elFormItem.clearValidate(); // 清除验证
    const [first] = data;
    // 单个图片
    if (this.type === "single") {
      this.inputValue(first);
    }
    // 多个图片
    if (this.type === "card") {
      this.inputValue(
        this.value && this.value !== "" ? `${this.value},${first}` : first,
      );
    }
  }
  @Emit("change")
  public onChange(file: ElUploadInternalFileDetail) {
    return file;
  }
  onError(err: ErrorEvent) {
    logUtils.info("ImageUploader onError", err);
    this.loading = false;
    this.$message.error(err.type);
  }
  handleBeforeUpload(file: ElUploadInternalRawFile) {
    return fsUtils.limit(file, ["image"]);
  }
  onExceed() {
    this.$message.warning(`最多能上传${this.limit}张图片`);
  }
  onPreview(file: FileListItem) {
    this.dialogUrl = file.url;
    this.dialog = true;
  }
  onRemove(file: any) {
    let mUrl = file.url;
    if (file.response && Array.isArray(file.response)) {
      const [resUrl] = file.response;
      mUrl = resUrl || file.url;
    }
    if (this.value) {
      const newValue = this.value
        .split(",")
        .filter((el) => el !== mUrl)
        .join(",");
      this.inputValue(newValue);
    }
  }
  httpRequest(options: HttpRequestOptions) {
    logUtils.info("ImageUploader httpRequest", options);
    this.loading = true;
    uploadService.eleUploadRequest(options);
  }
  get url() {
    if (!this.value || this.value === "") {
      return "";
    }
    const [first] = this.value.split(",");
    return first;
  }
  get acceptStr() {
    return fsUtils.getAcceptStr(["image"]);
  }
  get listType() {
    switch (this.type) {
      case "single":
        return "text";
      case "card":
        return "picture-card";
      default:
        return "text";
    }
  }
}
</script>

<style lang="scss">
.image-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .show-box {
    width: 178px;
    height: 178px;
    line-height: 178px;
    position: relative;
  }
  .show-image {
    width: 100%;
    height: 100%;
  }
  .show-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
}
</style>
