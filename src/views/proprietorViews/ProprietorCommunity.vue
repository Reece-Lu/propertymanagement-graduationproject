<template>
  <div style="height: 100vh">
    <van-nav-bar title="我的社区"/>

    <van-cell-group inset title="报修维修">
      <van-cell title="报修申请" is-link to="/proprietorhome/createfixingreport"/>
      <van-cell title="报修记录" is-link to="/proprietorhome/checkfixingreport"/>
    </van-cell-group>

    <van-cell-group inset title="隔离助手">
      <van-cell title="快递代领" is-link to="/proprietorhome/createexpressdelivery"/>
      <van-cell title="历史查询" is-link to="/proprietorhome/trackexpressdelivery"/>
    </van-cell-group>

    <van-cell-group inset title="我的宠物">
      <van-cell title="登记宠物" is-link to="/proprietorhome/registerpet"/>
    </van-cell-group>

  </div>

</template>

<script>
export default {
  name: "ProprietorCommunity",
  data(){
    return{

    }
  },
}
</script>

<style scoped>

</style>
