<template>
    <div class="f-header">
        <span class="logo">
            <i class="el-icon-notebook-1 mr-5 ml-10"></i>
            网上留言簿——计算机网络知识
        </span>
        <div class="ml-auto flex items-center mr-15">
            <el-dropdown>
                <span class="el-dropdown-link text-light-50">
                    用户管理<i class="el-icon-arrow-down el-icon--right" ></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-s-promotion" @click.native="login" >用户登入</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button" @click.native="logout">退出登陆</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return{

    }
  },
  methods:{
    async logout() {
      var token = sessionStorage.getItem("token");
      if (token=="" || token == null) {
        this.$message.error("当前未登陆");
        return;
      }
      sessionStorage.removeItem("token");
      const { data: res } = await this.$http.get('/user/logout')
      if (!res.success) return this.$message.error(res.errorMsg);
      this.$message.success("登出成功");
    },
    login() {
      var token = sessionStorage.getItem("token");
      if (token != null && token!="") {
        this.$message.error("当前已经有账户登陆");
        return;
      }
      this.$router.push('/login');
    }
  }
}

</script>

<style>
.f-header {
    @apply flex items-center bg-light-blue-500 text-light-50 fixed top-0 left-0 right-0 z-10;
    height: 64px;
}

.logo {
    width: 400px;
    @apply flex items-center text-xl ml-5;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-light-blue-400;
}

.f-header.dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5
}
</style>