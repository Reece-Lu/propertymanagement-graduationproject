<template>
      <div class="login-container">
        <div class="emptyBox"></div>
        <el-form status-icon label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page"
                 :model="user"
                 :rules="rules"
                 ref="userForm">
            <h1 class="title">后疫情时代智慧物业管理系统</h1>
            <el-form-item prop="userName">
              <el-input
                  size="medium"
                  style="margin: auto 0"
                  prefix-icon="el-icon-user"
                  v-model="user.userName"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                  size="medium"
                  style="margin: auto 0"
                  prefix-icon="el-icon-lock"
                  show-password
                  v-model="user.password"
              ></el-input>
            </el-form-item>
          <el-radio v-model="roleChoice" label="1" style="margin: 1%" border size="mini">业主</el-radio>
          <el-radio v-model="roleChoice" label="2" style="margin: 1%" border size="mini">物业管理</el-radio>
            <el-form-item style="width:100%;">
              <el-button type="primary"  autocomplete="off" style="width:100%; margin-top: 3%" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
      </div>

</template>

<script>

import { loginForPropertyManagement, loginForProprietor} from "@/api/Login";

export default {
  name: 'Login',
  data(){
    return{
      roleChoice:'1',
      user: {
        userName:'',
        password:''
      },
      //数据过滤，要求用户输入合法的数据
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      }
    }
  },
 methods: {
   handleLogin() {
     //roleChoice为2，物业身份登陆页
     if(this.roleChoice==='2'){
       loginForPropertyManagement(this.user).then(res=>{
         // console.log(res)
         //释放路由守卫
         localStorage.setItem('isLogin','1');
         localStorage.setItem('user',JSON.stringify(res));
         this.$router.push('/propertymanagementhome')
       }).catch(()=>{
         this.$message.error("登陆失败")
       })
     }else{
       //roleChoice为1，业主身份登陆页
       loginForProprietor(this.user).then(res=>{
         // console.log(res)
         //释放路由守卫
         localStorage.setItem('isLogin','1');
         localStorage.setItem('user',JSON.stringify(res));
         this.$router.push('/proprietormine')
         this.$notify({ type: 'success', message: '登陆成功，Welcome！' });
       }).catch(()=>{
         this.$message.error("登陆失败")
       })
     }

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
   height: 20%;
   width: 100%;
 }

.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 0 auto;
  height: 45%;
  width: 55%;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  //box-shadow: 0 0 5px #cac6c6;
}


.title{
  font-size: 18px;
  text-align: center;
  line-height: 20px;
  margin: 30px;
}
</style>
