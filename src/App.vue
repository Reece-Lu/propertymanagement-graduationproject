<template>
  <el-container>
    <el-header>
      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/Login">Login</router-link>
        </div>
        <router-view/>
      </div>
    </el-header>
  </el-container>


</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #409EFF;

}

#nav {
  width: 100%;
  height: 40px;
  margin-top: 0;
  background-color: rgb(179, 216, 255);
}

#nav a {
  background-color: aquamarine;
  float: right;
  width: 50px;
  height: 40px;
  margin-right: 10px;
  font-weight: bold;
  color: #2c3e50;

}

#nav a.router-link-exact-active {
  color: #409EFF;
}
</style>
