<!--
 * @Descripttion:
 * @version:
 * @Author: marui
 * @Date: 2021-02-20 16:45:10
-->
<template>
  <div class="content-main">
    <el-button type="primary" icon="el-icon-plus" @click="send"
      >发送信息</el-button
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// lib
// components & widgets
// config
// script & public
import GoEasy from "@/public/lib/GoEasy";
// controller & service
// interface
// 其它

@Component
export default class TemplatePush extends Vue {
  send() {
    GoEasy.send("ett7wdEp", "测试信息");
    GoEasy.send("admin", "测试信息");
  }
}
</script>

<style lang="scss">
</style>
