<template>
  <!--Sidebar, as a component of the Home page-->
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 100%"
  >
    <router-link to="/propertybroadcast">
      <el-menu-item index="1" >
        <span slot="title"><i class="el-icon-message-solid"></i>Community Broadcast</span>
      </el-menu-item>
    </router-link>
    <router-link to="/reportandrepair">
      <el-menu-item index="2" >
        <span slot="title"><span class="iconfont icon-icongongju"></span> Report and Repair</span>
      </el-menu-item>
    </router-link>
    <el-submenu index="3">
      <template slot="title"><span class="iconfont icon-bingdu"></span> Quarantine Assistant</template>
      <el-menu-item-group>
        <router-link to="/propertyexpressdelivery">
          <el-menu-item index="3-1" > Express Delivery Assistance</el-menu-item>
        </router-link>
        <el-menu-item index="3-2" disabled> Quarantine Logistics</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <router-link to="/propertysearchpet">
      <el-menu-item index="4">
        <span slot="title"><span class="iconfont icon-xiedaichongwu"></span> Pet Management</span>
      </el-menu-item>
    </router-link>

    <router-link to="/propertycar">
      <el-menu-item index="5">
        <span slot="title"><span class="iconfont icon-cheliang"></span> Parking Management</span>
      </el-menu-item>
    </router-link>

    <router-link to="/propertydecoration">
      <el-menu-item index="6">
        <span slot="title"><i class="el-icon-present"></i> Decoration Registration</span>
      </el-menu-item>
    </router-link>

    <router-link to="/proprietorarchives">
      <el-menu-item index="7" >
        <span slot="title"><span class="iconfont icon-record-full"></span> Proprietor Archives</span>
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
