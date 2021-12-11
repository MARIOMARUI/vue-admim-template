<template>
  <div class="error-view">
    <div class="err-container">
      <img class="error-img" src="../../style/img/403.png" />
      <p class="error-title">403</p>
      <p class="error-show">抱歉，您没有权限访问该页面。</p>
      <el-button type="primary" @click="next">返回上一页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  next() {
    this.$router.back();
  }
}
</script>

<style lang="scss">
.error-view {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.err-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.error-img {
  width: 286px;
  height: 325px;
  margin-bottom: 10px;
}
.error-title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  margin: 15px 0;
}
.error-show {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  margin-bottom: 30px;
}
</style>
