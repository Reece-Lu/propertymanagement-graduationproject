<template>
<!--导航栏，作为Home页的子组件-->
  <div id="header">
    <div id="headerLeft">
      后疫情时代物业管理系统
    </div>
    <div id="headerRight">
      <el-button type="primary" @click="logout" style="margin-right: 10px">退出</el-button>
      <router-link to="/about">
        <el-button type="primary" style="margin-right: 5px">关于</el-button>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "Header",
  methods:{
    logout(){
      //返回登陆页，释放localStorage中的isLogin数据，激活路由守卫
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
