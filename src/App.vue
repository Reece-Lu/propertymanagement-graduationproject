<template>
  <el-container id="main-container">
    <el-header>
      <div class="buttonBox">
        <router-link to="/">
          <el-button type="primary" plain>Home</el-button>
        </router-link>
      </div>
      <div class="buttonBox">
        <router-link to="/about">
          <el-button type="primary" plain>关于</el-button>
        </router-link>
      </div>
      <div class="buttonBox">
        <router-link to="/Login">
          <el-button type="primary" plain>登陆</el-button>
        </router-link>
      </div>
    </el-header>
    <el-main id="el-main-container">
      <router-view/>
    </el-main>
  </el-container>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
.el-header{
  text-align: center;
  line-height: 60px;
  background-color: rgb(160, 207, 255);
  width: 100%;
}
#main-container{
  width: 100%;
  height: 100vh;
}
#el-main-container{
  margin: 0;
  padding: 0;
}
.buttonBox{
  float: right;
  width: 80px;
  margin-right: 5px;
}

</style>
