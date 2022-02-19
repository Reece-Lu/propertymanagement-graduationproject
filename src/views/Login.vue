<template>
      <div class="login-container">

        <div class="emptyBox"></div>
        <el-form status-icon label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
          <h3 class="title">后疫情时代智慧物业管理系统</h3>
          <h3 class="title">物业登陆</h3>
          <el-form-item prop="username">
            <el-input placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-checkbox>记住密码</el-checkbox>
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>

</template>

<script>
import router from "@/router";
export default {
  name: 'Login',
 methods:{
   handleLogin(){
     localStorage.setItem('isLogin','1');
     router.push({path:'/'})
   }
 }

}
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


.title{
  font-size: 20px;
  text-align: center;
  line-height: 20px;
  margin: 25px;
}
</style>
