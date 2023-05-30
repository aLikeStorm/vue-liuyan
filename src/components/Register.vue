<template>
    <el-row>
        <el-col :lg="16" :md="12" class="left">
            <div >
                <div class="text-bold text-5xl text-light-50">欢迎光临</div>
                <div class="text-gray-200 text-sm mt-4">这里是网上留言簿管理员注册页面</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="font-bold text-3xl text-gray-800">欢迎注册</h2>
            <div>
                <span class="line"></span>
                <span>使用邮箱注册</span>
                <span class="line"></span>
            </div>
            <el-form>
                <el-form-item :rules="registerRules">
                    <el-input v-model="user.email" prefix-icon="el-icon-user" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="user.username" prefix-icon="el-icon-unlock" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="user.password" prefix-icon="el-icon-unlock" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="flex justify-center ">
                    <el-button @click="register" type="primary" class="mr-4">注册</el-button>
                    <el-button @click="reset" type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
  </template>

<script>
import router from "@/router";

export default{
    data(){
        return{
            user:{
                email:"",
                username:"",
                password:""
            },
            registerRules:{
                
            }
        }
    },
  methods:{
      isEmail (s) {
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
      },
      async register(){
        if (!this.isEmail(this.user.email )
            || this.user.username == null || this.user.username == ""
            ||this.user.password == null || this.user.password == "") {
          this.$message.error("邮箱格式错误或者用户名或者密码为空")
          return
        }
        const { data: res } = await this.$http.post('/user/register', this.user)
        if (!res.success) return this.$message.error(res.errorMsg);
        this.$message.success("用户注册成功");
        router.push("/login")
      },
    reset() {
      this.user.email = null;
      this.user.password = null;
      this.user.username = null;
    }
  }
}
</script>