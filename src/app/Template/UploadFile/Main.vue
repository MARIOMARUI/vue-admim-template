<template>
  <div class="content-main">
    <el-alert title="上传文件" type="info" effect="dark" :closable="false" />
    <div class="mt-10 mb-10">
      <file-uploader :limit="2" :disabled="false" accept="all" />
    </div>
    <div class="mt-10 mb-10">
      <image-uploader />
    </div>
    <el-alert
      title="表单中的上传"
      type="info"
      effect="dark"
      :closable="false"
    />
    <div class="mt-10 mb-10">
      <el-form label-width="100px" :model="form" ref="form" :rules="rules">
        <el-form-item label="输入字段" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="上传附件" prop="file">
          <file-uploader
            v-model="form.file"
            :limit="3"
            :disabled="false"
            accept="office"
          />
        </el-form-item>
        <el-form-item label="上传单个图片" prop="image">
          <image-uploader v-model="form.image" />
        </el-form-item>
        <el-form-item label="上传多个图片" prop="arrStr">
          <image-uploader
            v-model="form.arrStr"
            type="card"
            :limit="2"
            :disabled="false"
          />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" class="login-btn" @click="submitForm"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// lib
// components & widgets
import FileUploader from "@/components/Uploader/FileUploader.vue";
import ImageUploader from "@/components/Uploader/ImageUploader.vue";
// config
// script & public
import logUtils from "@/utils/logUtils";
// controller & service
// interface
// 其它

@Component({
  components: {
    FileUploader,
    ImageUploader,
  },
})
export default class TemplateUploadFile extends Vue {
  form = {
    file: [
      // "http://171.221.254.38:59000/water/564860150823534592.doc",
      // "http://171.221.254.38:59000/water/564860150823534592.doc",
    ],
    image: "",
    arrStr: "",
  };
  rules = {
    name: [{ required: true, message: "请输入必填字段" }],
    file: [{ type: "array", required: true, message: "请上传附件" }],
    image: [{ required: true, message: "请上传图片" }],
    arrStr: [{ required: true, message: "请上传图片" }],
  };
  mounted() {
    setTimeout(() => {
      // eslint-disable-next-line operator-linebreak
      this.form.image =
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100";
      // eslint-disable-next-line operator-linebreak
      this.form.arrStr =
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100";
    }, 3000);
  }
  uploadSuccess() {
    //
  }
  submitForm() {
    const form: any = this.$refs.form;
    logUtils.info("提交表单", JSON.stringify(this.form));
    form.validate((valid: boolean) => {
      if (!valid) return;
      this.$message.success("提交成功");
    });
  }
}
</script>

<style lang="scss">
</style>
