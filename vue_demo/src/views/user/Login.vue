<template>
  <el-form :model="loginFrom" :rules="loginRules" ref="loginFrom" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginFrom.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginFrom.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <el-button type="text" class="register" @click="register">注册</el-button>
    <el-form-item style="width:100%;">
      <el-button type="primary" native-type="submit" style="width:100%;" @click.native.prevent="loginSubmit" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import {requestLogin} from '../../api/api'
  export default {
    name: "Login",
    data(){
      return{
        logining: false,
        loginFrom:{
          account:"",
          checkPass:""
        },
        loginRules:{
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked:true
      }
    },
    methods:{
      loginSubmit:function () {
        var _this = this;
        //表单验证
        this.$refs.loginFrom.validate((valid) => {
          if(valid){
            this.logining=true;
            var loginParams=new URLSearchParams();
            loginParams.append("username",this.loginFrom.account);
            loginParams.append("password",this.loginFrom.checkPass);
            requestLogin(loginParams).then(res=>{
              console.log(res);
              let { status,data,msg } = res;
              console.log(data)
              if (status == 0) {
                sessionStorage.setItem('user', JSON.stringify(data));
                this.$router.push({ path: '/index' });

              } else {
                this.logining=false;
                this.$message({
                  message: msg,
                  type: 'error'
                });

              }

            })
          }
          else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      register:function () {
        this.$router.push('/register');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .register{
      margin: 0px 0px 35px 300px;
    }
  }
</style>
