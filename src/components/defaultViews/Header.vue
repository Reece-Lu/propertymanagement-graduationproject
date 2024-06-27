<template>
  <!--Navigation bar, as a sub-component of the Home page-->
  <div id="header">
    <div id="headerLeft">
      Residential Complex Management System
    </div>
    <div id="headerRight">
      <el-button type="primary" @click="logout" style="margin-right: 10px">Logout</el-button>
      <router-link to="/">
        <el-button type="primary" style="margin-right: 5px">About</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods:{
    logout(){
      // Return to login page, clear isLogin data from localStorage, and activate route guard
      this.$router.push('/login')
      localStorage.removeItem('isLogin');
      localStorage.removeItem('user');
    }
  }
}
</script>

<style scoped>
#headerLeft{
  float: left;
}
#headerRight{
  float: right;
}
</style>
