<template>
  <div class="login-container">
    <div class="message-bar">
      <p>Proprietor Test Account: {reece, 12345}</p>
      <p>Property Management Test Account: {sam, 12345}</p>
    </div>
    <div class="emptyBox"></div>
    <el-form status-icon label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page"
             :model="user"
             :rules="rules"
             ref="userForm">
      <h1 class="title">Residential Complex Management System</h1>
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
      <el-radio v-model="roleChoice" label="1" style="margin: 1%" border size="mini">Proprietor</el-radio>
      <el-radio v-model="roleChoice" label="2" style="margin: 1%" border size="mini">Property Management</el-radio>
      <el-form-item style="width:100%;">
        <el-button type="primary"  autocomplete="off" style="width:100%; margin-top: 3%" @click="handleLogin">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginForPropertyManagement, loginForProprietor } from "@/api/Login";

export default {
  name: 'Login',
  data() {
    return {
      roleChoice: '1',
      user: {
        userName: '',
        password: ''
      },
      userId: '',
      Name: "",
      // 数据过滤，要求用户输入合法的数据
      rules: {
        userName: [
          { required: true, message: "Please enter the username", trigger: "blur" },
          { min: 3, max: 10, message: "Length should be 3 to 10 characters", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Please enter the password", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "Length should be 1 to 20 characters",
            trigger: "blur",
          },
        ],
      }
    }
  },
  methods: {
    handleLogin() {
      // roleChoice为2，物业身份登陆页
      if (this.roleChoice === '2') {
        loginForPropertyManagement(this.user).then(res => {
          // 释放路由守卫
          localStorage.setItem('isLogin', '1');
          localStorage.setItem('user', JSON.stringify(res));
          this.$router.push('/propertymanagementhome')
        }).catch(() => {
          this.$message.error("Login failed")
        })
      } else {
        // roleChoice为1，业主身份登陆页
        loginForProprietor(this.user).then(res => {
          // 释放路由守卫
          localStorage.setItem('isLogin', '1');
          // 存储身份 《方案一》
          localStorage.setItem('user', JSON.stringify(res));
          // 存储身份 《方案二》
          this.userId = res.id
          this.Name = res.name
          console.log(this.userId + "from login")
          this.$store.commit("setUserId", this.userId)
          this.$store.commit("setName", this.Name)
          this.$router.push('/proprietormine')
          this.$notify({ type: 'success', message: 'Login successful, Welcome!' });
        }).catch(() => {
          this.$message.error("Login failed")
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
  background-image: url("../assets/loginPageBackground.jpeg");
  background-size: cover;
  position: absolute;
}

.message-bar {
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  color: #333;
}

.emptyBox {
  height: 10%;
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
}

.title {
  font-size: 18px;
  text-align: center;
  line-height: 20px;
  margin: 30px;
}
</style>
