<template>
  <div>
    <van-nav-bar title="我的社区"/>

    <van-cell-group inset title="报修维修">
      <van-cell title="创建维修工单" is-link to="/proprietorhome/createfixingreport"/>

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
