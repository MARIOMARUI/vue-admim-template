<template>
  <div id="editor" />
</template>

<script lang="ts">
import logUtils from "@/utils/logUtils";
import { Component, Vue } from "vue-property-decorator";
// lib
import Editor from "wangeditor";
// components & widgets
// config
// script & public
// controller & service
// interface
// 其它

@Component
export default class EditorContainer extends Vue {
  editor: any = null;
  editorData: any = "";
  mounted() {
    const editor = new Editor("#editor");
    editor.config.onchange = (newHtml: any) => {
      this.editorData = newHtml;
      this.$emit("editorContent", newHtml);
    };
    editor.create();
    this.editor = editor;
  }
  getEditorData() {
    // 通过代码获取编辑器内容
    const data = this.editor.txt.html();
    logUtils.log(data);
  }
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  }
}
</script>

<style lang="scss">
.w-e-toolbar {
  z-index: 2 !important;
}
.w-e-text-container {
  z-index: 1 !important;
}
</style>
