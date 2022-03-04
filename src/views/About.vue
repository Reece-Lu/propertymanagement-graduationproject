<template>
  <div class="about">
    <h1 style="text-align: center">About Page for Property Management System</h1>
    <p style="text-align: center">
      后台：http://82.156.219.134:1214/Reece_Lu/propertymanagement-graduationproject-server.git
    </p>
    <p style="text-align: center">
      前台：http://82.156.219.134:1214/Reece_Lu/propertymanagement-graduationproject.git
    </p>
    <p style="text-align: center">
      游客账号：guest 密码：Guest123
    </p>
    <h1 style="text-align: center">Developed by Lu Yuwen</h1>
    <h2 style="text-align: center">Guided by Gao Yu, Liu Caihong</h2>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    localStorage.removeItem('isLogin');
  }
}
</script>
