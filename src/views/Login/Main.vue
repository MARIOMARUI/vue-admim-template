<template>
  <div class="login-view">
    <el-card class="login-card">
      <div class="login-logo block-center" />
      <h2 class="login-title">{{ appName }}</h2>
      <el-form
        label-position="right"
        size="large"
        :model="form"
        ref="form"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="输入登录用户名"
            v-model="form.username"
          />
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            prefix-icon="el-icon-unlock"
            placeholder="输入用户密码"
            type="password"
            show-password
            v-model="form.pwd"
            @keyup.enter.native="changeInput"
          />
        </el-form-item>
        <!-- <el-form-item prop="phone">
          <el-input
            prefix-icon="el-icon-mobile-phone"
            placeholder="手机号"
            v-model="form.phone"
          />
        </el-form-item> -->
        <el-form-item prop="phoneVcode">
          <el-col :span="13">
            <el-input
              prefix-icon="el-icon-unlock"
              placeholder="手机验证码"
              maxlength="6"
              v-model="form.phoneVcode"
              @keyup.enter.native="changeInput"
            />
          </el-col>
          <el-col :span="10" :offset="1">
            <el-button
              type="primary"
              :disabled="isDisabled"
              @click="changeSendCode"
              >{{ sendVcodeBtn }}</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="13">
            <el-form-item prop="code">
              <el-input
                prefix-icon="el-icon-key"
                placeholder="4位验证码"
                maxlength="4"
                v-model="form.code"
                @keyup.enter.native="changeInput"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <button class="login-code-btn" type="button" @click="getCode">
              <img alt="验证码" :src="src" class="img-res" />
            </button>
          </el-col>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        class="login-btn"
        @click="submit"
        :loading="loading"
        >登录</el-button
      >
      <div v-if="isDev">
        <el-button class="login-btn" @click="devSubmit" :loading="loading"
          >开发环境登录</el-button
        >
      </div>
      <h5 class="login-copyright">{{ copyright }}</h5>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// lib
// components & widgets
// config
import { APP_NAME, isDevMode } from "@/config/env";
// script
// controller & service & logic
import { createCopyRight } from "./logic";
import {
  getCodeService,
  getMobileCodeService,
  loginService,
  mockLoginService,
} from "@/biz/authorize/service";
// interface
import { StoreState } from "@/store";
// 其它

@Component
export default class Login extends Vue {
  appName = APP_NAME;
  isDev = isDevMode();
  copyright = createCopyRight();
  src = "";
  loading = false;
  form = {
    username: "",
    pwd: "",
    code: "",
    phoneVcode: "",
  };
  sendVcodeBtn = "发送验证码";
  isDisabled = false;
  time = 60;
  rules = {
    username: [
      { required: true, message: "请输入用户名，6到32位", min: 6, max: 32 },
    ],
    pwd: [{ required: true, message: "请输入密码，6到32位", min: 6, max: 32 }],
    code: [{ required: true, message: "请输入图形验证码", len: 4 }],
    phone: [{ required: true, message: "请输入手机号，11位", len: 11 }],
    phoneVcode: [{ required: true, message: "请输入手机验证码，6位", len: 6 }],
  };
  mounted() {
    this.init();
    this.getCode();
  }
  init() {
    this.$store.commit("SET_ROUTERS", []); // 重置路由
    this.form.username = this.accountName; // 设置上一个登录的用户名
  }
  getCode() {
    const code = getCodeService();
    this.src = code;
  }
  async changeSendCode() {
    const { username } = this.form;
    if (!this.form.username) {
      this.$message.warning("请输入账号！");
      return;
    }
    // const result =
    await getMobileCodeService({
      sysUserName: username.trim(),
    });
    // if (!result.payload) {
    //   this.$message.success(`用户 ${username} 登录日使用次数为0`);
    // }
    this.isDisabled = true;
    const timer = setInterval(() => {
      this.sendVcodeBtn = `${this.time}秒后发送`;
      this.time -= 1;
      if (this.time < 0) {
        this.sendVcodeBtn = "重新发送";
        this.time = 60;
        this.isDisabled = false;
        clearInterval(timer);
      }
    }, 1000);
  }
  // 回车
  changeInput() {
    this.submit();
  }
  submit() {
    const form: any = this.$refs.form;
    form.validate((valid: boolean) => {
      if (!valid) return;
      this.userLogin();
    });
  }
  // 开发环境使用登录
  async devSubmit() {
    this.loading = true;
    const result = await mockLoginService(this.form.username);
    this.loading = false;
    if (result.payload) {
      this.loginSuccess(result.payload.username);
    } else {
      this.getCode();
    }
  }
  async userLogin() {
    this.loading = true;
    const result = await loginService(
      this.form.username,
      this.form.pwd,
      this.form.code,
      this.form.phoneVcode,
    );
    this.loading = false;
    if (result.payload) {
      this.loginSuccess(result.payload.username);
    } else {
      this.getCode();
    }
  }
  loginSuccess(username: string) {
    this.$message.success(`用户 ${username} 登录成功`);
    // 路由跳转
    this.$router.push("/").catch(() => {
      // https://stackoverflow.com/questions/62223195/vue-router-uncaught-in-promise-error-redirected-from-login-to-via-a
    });
  }
  get accountName() {
    const state: StoreState = this.$store.state;
    return state.account.account.username;
  }
}
</script>

<style lang="scss">
.login-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-logo {
  width: 80px;
  height: 80px;
  background-image: url("../../style/img/logo.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
.login-card {
  width: 330px;

  .el-card__body {
    padding: 20px 30px;
  }
}
.login-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
}
.login-btn {
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  margin-bottom: 20px;
}
.login-code-btn {
  display: inline-block;
  width: 100%;
  height: 40px;
}
.login-copyright {
  text-align: center;
}
</style>
