<template>
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
      localStorage.removeItem('isLogin');
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
