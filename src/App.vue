<template>
  <el-container>
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
      <router-view/>
    </el-header>
  </el-container>
</template>

<style>
.el-header{
  text-align: center;
  line-height: 60px;
  background-color: rgb(160, 207, 255);
}

.buttonBox{
  float: right;
  width: 80px;
  margin-right: 5px;
}

</style>
