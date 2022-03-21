<template>
<!--侧边栏，作为Home页面的组件-->
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 100%"
  >
    <el-menu-item index="1" disabled>
<!--      icon设置语句 <i class="el-icon-menu"></i>-->
      <span slot="title"><i class="el-icon-message-solid"></i>小区广播</span>
    </el-menu-item>
    <router-link to="/reportandrepair">
      <el-menu-item index="2" >
        <span slot="title"><span class="iconfont icon-icongongju"></span> 报修维修</span>
      </el-menu-item>
    </router-link>
    <el-submenu index="3">
      <template slot="title"><span class="iconfont icon-bingdu"></span> 隔离助手</template>
      <el-menu-item-group>
        <router-link to="/propertyexpressdelivery">
          <el-menu-item index="3-1" > 快递帮取</el-menu-item>
        </router-link>
        <el-menu-item index="3-2" disabled> 隔离后勤</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <router-link to="/propertysearchpet">
      <el-menu-item index="4">
        <span slot="title"><span class="iconfont icon-xiedaichongwu"></span> 宠物管理</span>
      </el-menu-item>
    </router-link>

    <router-link to="/propertycar">
      <el-menu-item index="5">
        <span slot="title"><span class="iconfont icon-cheliang"></span> 车位管理</span>
      </el-menu-item>
    </router-link>

    <el-menu-item index="6"  disabled>
      <span slot="title"><i class="el-icon-present"></i>装修登记</span>
    </el-menu-item>

    <router-link to="/proprietorarchives">
      <el-menu-item index="7" >
        <span slot="title"><span class="iconfont icon-record-full"></span> 业主档案</span>
      </el-menu-item>
    </router-link>


  </el-menu>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<style scoped>

</style>
