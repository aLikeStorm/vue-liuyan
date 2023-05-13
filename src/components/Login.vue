<template>
  <div class="login_container">
    <el-form ref="loginFromRef" :model="user" label-width="0px" :rules="loginRules" class="login_from">
      <!--    用户名-->
      <el-form-item prop="username">
        <el-input v-model="user.username" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <!--    密码-->
      <el-form-item prop="password">
        <el-input v-model="user.password" prefix-icon="el-icon-unlock" type="password"></el-input>
      </el-form-item>

      <!--    登陆-->
      <el-form-item class="btns">
        <el-button @click="login" type="primary">登陆</el-button>
        <el-button @click="resetLoginFrom" type="info">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

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
    }
  }
}
</script>

<style scoped>
.login_container {
  background-color: #fff;
  height: 100%;

}
</style>