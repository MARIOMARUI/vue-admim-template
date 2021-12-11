<template>
  <el-header class="admin-header">
    <div class="header-title" :class="{ collapse: menuCollapse }">
      <router-link class="sidebar-logo-link" to="/" v-if="menuCollapse">
        <img width="60" height="60" src="../../style/img/logo.jpg" alt="logo" />
        <!-- <h4 class="sidebar-title">{{ appName }}</h4> -->
      </router-link>
      <router-link class="sidebar-logo-link" to="/" v-else>
        <img width="60" height="60" src="../../style/img/logo.jpg" alt="logo" />
        <h4 class="sidebar-title">{{ appName }}</h4>
      </router-link>
    </div>
    <div class="header-bar">
      <button class="btn-collapse" @click="changeCollapse">
        <i :class="menuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" />
      </button>
      <div class="header-action">
        <button class="btn-collapse" @click="changeBigScreen">
          <i class="el-icon-pie-chart" />
        </button>
        <screenfull />
        <el-dropdown placement="bottom-end" size="medium">
          <span class="el-dropdown-link header-info">
            <h4 class="mr-10">{{ accountInfo.username }}</h4>
            <el-avatar shape="square">{{
              $store.state.account.account.username.substr(0, 1).toUpperCase()
            }}</el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div class="header-menu" @click="editPwd(true)">修改密码</div>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <div class="header-menu" @click="out">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <password-modal :show="pwdModal" @close="pwdModalClose" />
  </el-header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// lib
import { mapGetters } from "vuex";
// components & widgets
import Screenfull from "../Layout/Screenfull.vue";
import PasswordModal from "./PasswordModal.vue";
// config
import { APP_NAME } from "@/config/env";
// script
// controller & service
import { logoutService } from "@/biz/authorize/service";
// interface
import { StoreState } from "@/store";
import { Account } from "@/biz/authorize/model";
// import logUtils from "@/utils/logUtils";
// 其它

@Component({
  components: {
    Screenfull,
    PasswordModal,
  },
  computed: mapGetters(["accountInfo"]),
})
export default class AdminHeader extends Vue {
  accountInfo!: Account;
  appName = APP_NAME;
  pwdModal = false;
  changeCollapse() {
    const state: StoreState = this.$store.state;
    this.$store.commit("SET_MENU_COLLAPSE", !state.app.menuCollapse);
  }
  changeBigScreen() {
    this.$message.warning("此按钮应当受到权限控制！");
    this.$router.push({
      name: "BigScreen",
    });
  }
  editPwd() {
    this.pwdModal = true;
  }
  pwdModalClose(ok: boolean) {
    this.pwdModal = false;
    if (ok) {
      setTimeout(() => {
        this.logout();
      }, 3000);
    }
  }
  out() {
    this.$confirm("注销当前用户的登录状态?", "退出", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true,
    })
      .then(() => {
        this.logout();
      })
      .catch(() => {
        //
      });
  }
  async logout() {
    // 调用服务
    const result = await logoutService(100);
    if (result) {
      this.$message.success("当前用户已退出登录");
    }
  }
  get menuCollapse() {
    const state: StoreState = this.$store.state;
    return state.app.menuCollapse;
  }
}
</script>

<style lang="scss">
.admin-header {
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999; // 避免主体内容上滚 覆盖了header
}
.collapse {
  width: auto !important;
}

.header-title {
  width: 200px;
  text-align: center;
  height: 100%;
}
.sidebar-logo-link {
  display: flex;
  justify-content: center;
  .sidebar-title {
    display: flex;
    align-items: center;
    color: #000;
    font-weight: 600;
    line-height: 50px;
    font-size: 14px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
}
.header-bar {
  flex: auto;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn-collapse {
  width: 40px;
  height: 40px;
  font-size: 22px;
}
.header-action {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;

  .el-dropdown {
    cursor: pointer;
  }
}
.header-info {
  display: flex;
  align-items: center;
}
.header-menu {
  width: 100px;
}
</style>
