<template>
      <div class="login-container">

        <div class="emptyBox"></div>
        <el-form :model="ruleForm2" :rules="rules2"
                 status-icon
                 ref="ruleForm2"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
          <h3 class="title">后疫情时代智慧物业管理系统</h3>
          <h3 class="title">物业登陆</h3>
          <el-form-item prop="username">
            <el-input type="text"
                      v-model="ruleForm2.username"
                      auto-complete="off"
                      placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password"
                      v-model="ruleForm2.password"
                      auto-complete="off"
                      placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-checkbox
              v-model="checked"
              class="rememberme"
          >记住密码</el-checkbox>
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
          </el-form-item>
        </el-form>
      </div>

</template>

<script>
export default {
  data(){
    return {
      logining: false,
      ruleForm2: {
        username: 'admin',
        password: '123456',
      },
      rules2: {
        username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
        password: [{required: true, message: 'enter your password', trigger: 'blur'}]
      },
      checked: false
    }
  },
  // methods: {
  //   handleSubmit(event){
  //     this.$refs.ruleForm2.validate((valid) => {
  //       if(valid){
  //         this.logining = true;
  //         if(this.ruleForm2.username === 'admin' &&
  //             this.ruleForm2.password === '123456'){
  //           this.logining = false;
  //           sessionStorage.setItem('user', this.ruleForm2.username);
  //           this.$router.push({path: '/'});
  //         }else{
  //           this.logining = false;
  //           this.$alert('username or password wrong!', 'info', {
  //             confirmButtonText: 'ok'
  //           })
  //         }
  //       }else{
  //         console.log('error submit!');
  //         return false;
  //       }
  //     })
  //   }
  // }
};
</script>

<style scoped>

.login-container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/loginPageBackground.jpeg") ;
  background-size: cover;
  position: absolute;
  /*margin-top: 60px;*/
}

 .emptyBox{
   height: 150px;
   width: 100%;
 }

.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 0 auto;
  height: 450px;
  width: 500px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  //box-shadow: 0 0 5px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 15px;
  text-align: left;
}

.el-header{
  width: 100%;
  text-align: center;
  line-height: 60px;
}

.buttonBox{
  float: right;
  width: 80px;
  margin-right: 5px;
}

.title{
  font-size: 20px;
  text-align: center;
  line-height: 20px;
  margin: 25px;
}
</style>
