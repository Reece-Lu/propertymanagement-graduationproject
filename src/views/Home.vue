<template>
  <div class="home">
    <el-container>
<!--      网页头部-->
      <el-header>
        <Header/>
      </el-header>
<!--头部以下-->
      <el-container>
<!--        侧边栏部分-->
        <el-aside width="200px">
          <Aside/>
        </el-aside>
<!--        主体部分-->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>

    </el-container>


  </div>
</template>

<script>
// @ is an alias to /src

import Header from '@/components/defaultViews/Header'
import Aside from '@/components/defaultViews/Aside'
export default {
  name: 'Home',
  components: {
    // HelloWorld
    Header,Aside
  },

}
</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

a {
  text-decoration: none;
}

</style>
