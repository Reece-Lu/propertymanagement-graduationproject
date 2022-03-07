<template>
  <div>
    <van-nav-bar title="我的社区"/>

    <van-cell-group inset title="报修维修">
      <van-cell title="报修申请" is-link to="/proprietorhome/createfixingreport"/>
      <van-cell title="报修记录" is-link to="/proprietorhome/checkfixingreport"/>
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
