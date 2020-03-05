<template>
  <el-form :model="registerFrom" :rules="registerRules" ref="registerFrom" label-position="left" label-width="80px" class="demo-ruleForm login-container">
    <h3 class="title">注册</h3>
    <el-form-item prop="account" label="账号">
      <el-input type="text" v-model="registerFrom.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码" >
      <el-input type="password" v-model="registerFrom.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass" label="确认密码">
      <el-input type="password" v-model="registerFrom.checkPass" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item prop="email" label="邮箱">
      <el-input type="text" v-model="registerFrom.email" auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="phone" label="电话">
      <el-input type="text" v-model="registerFrom.phone" auto-complete="off" placeholder="手机"></el-input>
    </el-form-item>
    <el-form-item prop="question" label="密保问题">
      <el-input type="text" v-model="registerFrom.question" auto-complete="off" placeholder="密保问题"></el-input>
    </el-form-item>
    <el-form-item prop="answer" label="密保答案">
      <el-input type="text" v-model="registerFrom.answer" auto-complete="off" placeholder="密保答案"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" native-type="submit" @click.native.prevent="registerSubmit" :loading="registering">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {requestRegister} from '../../api/api'
  import {usernameValidator,emailValidator,phoneValidator} from '../../js/registerFromRules'
  export default {
    name: "Register",
    data(){
      let checkPassValidator=(rule,value,callback)=>{
        if (value!==this.registerFrom.password)
          callback("两次输入密码不一致!")
        else
          callback()
      };
      return{
        registering: false,
        registerFrom:{
          account:"",
          password:"",
          checkPass:"",
          email:"",
          phone:"",
          question:"",
          answer:""
        },
        registerRules:{
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { pattern: /^[a-zA-Z]\w{5,12}$/,message:'请以字母开头,不得有除_的特殊字符，且长度必须为6-11位'},
            { validator: usernameValidator,trigger:'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[\W]).{6,15}$/,message:'密码中必须包含大小写 ' +
                '字母、数字、特称字符,且长度为6-15',}
          ],
          checkPass: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { validator: checkPassValidator, }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { pattern:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,message:'请输入正确的邮箱'},
            { validator: emailValidator,trigger:'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern:/0?(13|14|15|18|17)[0-9]{9}/,message:'请输入正确的手机号'},
            { validator: phoneValidator,trigger:'blur' }
          ],
          question: [
            { required: true, message: '请输入密保问题', trigger: 'blur' },
          ],
          answer: [
            { required: true, message: '请输入密保答案', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
      registerSubmit:function () {
        var _this = this;
        this.$refs.registerFrom.validate((valid)=>{
          if (valid){
            this.registering=true;
            //合并属性
            let para = Object.assign({}, this.registerFrom,{username:this.registerFrom.account});
            //删除属性
            this.$delete(para,'checkPass');
            this.$delete(para,'account');
            console.log(para)
            requestRegister(para).then(res=>{
              console.log(res)
              let { status,data,msg } = res;
              console.log(data)
              if (status == 0) {
                sessionStorage.setItem('user', JSON.stringify(data));
                this.$message({
                  message: '注册成功，正在登录',
                  type: 'success'
                });
                this.$router.push({ path: '/index' });

              } else {
                this.registering=false;
                this.$message({
                  message: msg,
                  type: 'error'
                });

              }

            })

          } else {
            console.log('error submit!!');
            return false;
          }
        })
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
    margin: 50px auto;
    width: 500px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
  }

</style>
