<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-menu-item index="1" disabled>
<!--      icon设置语句 <i class="el-icon-menu"></i>-->
      <span slot="title">小区广播</span>
    </el-menu-item>
    <el-menu-item index="2" disabled>
      <span slot="title">业主档案</span>
    </el-menu-item>
    <router-link to="/reportandrepair">
      <el-menu-item index="3" >
        <span slot="title">报修维修</span>
      </el-menu-item>
    </router-link>
    <el-menu-item index="4"  disabled>
      <span slot="title">疫情防控</span>
    </el-menu-item>
    <el-menu-item index="5"  disabled>
      <span slot="title">隔离助手</span>
    </el-menu-item>
    <el-menu-item index="6"  disabled>
      <span slot="title">宠物档案</span>
    </el-menu-item>
    <el-menu-item index="7"  disabled>
      <span slot="title">小区挪车</span>
    </el-menu-item>
    <el-menu-item index="8"  disabled>
      <span slot="title">装修登记</span>
    </el-menu-item>
    <el-menu-item index="9"  disabled>
      <span slot="title">代驾</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<style scoped>

</style>
