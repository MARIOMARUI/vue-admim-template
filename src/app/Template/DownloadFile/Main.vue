<template>
  <div class="content-main">
    <el-alert title="上传单个图片" type="info" effect="dark" :closable="false" />
    <el-button type="primary" icon="el-icon-plus" @click="send">发送信息</el-button>
    <el-alert title="表单中上传" type="info" effect="dark" :closable="false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// lib
// components & widgets
// config
// script & public
// controller & service
// interface
// 其它

@Component
export default class DownloadFile extends Vue {
  send() {
    //----
  }
}
</script>

<style lang="scss"></style>
