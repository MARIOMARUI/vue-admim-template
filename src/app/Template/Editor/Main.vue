<template>
  <div class="content-main">
    <editor-container @editorContent="getEditorContent" />
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script lang="ts">
import logUtils from "@/utils/logUtils";
import { Component, Vue } from "vue-property-decorator";
// lib
// components & widgets
import EditorContainer from "./EditorContainer.vue";
// config
// script & public
// controller & service
// interface
// 其它

@Component({
  components: {
    EditorContainer,
  },
})
export default class TemplateEditor extends Vue {
  content = "";
  editorData = "";
  getEditorContent(data: any) {
    this.content = data;
    // 将获取的Html转成纯文本
    this.editorData = data
      .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
      .replace(/<[^>]+?>/g, "")
      .replace(/\s+/g, " ")
      .replace(/ /g, " ")
      .replace(/>/g, " ");
  }
  submit() {
    logUtils.log(this.editorData);
    logUtils.log(this.content);
  }
}
</script>

<style lang="scss"></style>
