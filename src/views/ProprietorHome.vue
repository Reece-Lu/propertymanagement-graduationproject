<template>
  <div>
    <div style="background: rgb(244, 244, 245); height: 100vh">
      <router-view/>
    </div>
    <van-tabbar fixed v-model="active" safe-area-inset-bottom>
      <router-link to="/proprietorbroadcast" style="width: 33%">
        <van-tabbar-item icon="home-o" name="broadcast">小区广播</van-tabbar-item>
      </router-link>
      <router-link to="/proprietorcommunity" style="width: 33%">
        <van-tabbar-item icon="search" name="community">我的社区</van-tabbar-item>
      </router-link>
      <router-link to="/proprietormine" style="width: 33%">
      <van-tabbar-item icon="friends-o" name="mine">我的</van-tabbar-item>
      </router-link>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "ProprietorHome",
  data(){
    return{
      active:'mine'
    }
  }
}
</script>

<style scoped>

</style>
