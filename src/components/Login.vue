<template>
  <el-row>
      <el-col :lg="16" :md="12" class="left">
          <div >
              <div class="text-bold text-5xl text-light-50">欢迎光临</div>
              <div class="text-gray-200 text-sm mt-4">这里是网上留言簿管理员登入页面</div>
          </div>
      </el-col>
      <el-col :lg="8" :md="12" class="right">
          <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
          <div>
              <span class="line"></span>
              <span>账号密码登录</span>
              <span class="line"></span>
          </div>
          <el-form ref="loginFromRef" :model="user" label-width="0px" :rules="loginRules">
              <el-form-item prop="username">
                  <el-input v-model="user.username" prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input v-model="user.password" prefix-icon="el-icon-unlock" type="password"></el-input>
              </el-form-item>
              <el-form-item class="flex items-center justify-center" >
                  <el-button @click="login" type="primary" class="mr-4" >登陆</el-button>
                  <!-- <el-button  @click="resetLoginFrom" type="info" >重置</el-button> -->
                  <el-button @click="register" type="info" >注册</el-button>
              </el-form-item>
          </el-form>
      </el-col>
  </el-row>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
name: "Login",
data(){
  return{
    user:{
      username:"",
      password:""
    },
    //为登陆表单添加登陆验证
    loginRules:{
      username:[
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 0, max: 10, message: '字符长度请在5-10之间', trigger: 'blur' }
      ],
      password:[
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 0, max: 20, message: '字符长度请在5-20之间', trigger: 'blur' }
      ]
    }
  }

},
methods:{
  resetLoginFrom() {
    //点击重置表单，使用了ref
    this.$refs.loginFromRef.resetFields();
  },
  login() {
    //进行表单预验证根据校验规则进行预验证
    if (this.user.username == null || this.user.username == ""
        ||this.user.password == null || this.user.password == "") {
      this.$message.error("用户名或者密码不能为空")
      return
    }
    this.$refs.loginFromRef.validate(async valid=>{
      //验证不成功
      if (!valid)return;
      const {data:res} = await this.$http.post("/user/login",this.user);
      console.log(res);
      if (!res.success) return this.$message.error('登陆失败')
      const token = res.data;
      window.sessionStorage.setItem('token',token);
      this.$router.push('/home');

    });
  },
  register(){
    this.$router.push("/register")
  }
}
}
</script>

<style>
.left{
  @apply bg-blue-400 min-h-screen flex justify-center items-center;
}
.right{
  @apply bg-light-50 min-h-screen flex justify-center items-center flex-col;
}
.right>div{
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .line{
  @apply h-[1px] w-16 bg-gray-200;
}
</style>