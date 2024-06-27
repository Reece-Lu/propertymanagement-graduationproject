<template>
  <div>
    <div style="background: rgb(244, 244, 245);">
      <router-view/>
    </div>
    <van-tabbar fixed v-model="active" safe-area-inset-bottom>
      <router-link to="/proprietorbroadcast" style="width: 33%">
        <van-tabbar-item icon="home-o" name="broadcast">Community Broadcast</van-tabbar-item>
      </router-link>
      <router-link to="/proprietorcommunity" style="width: 33%">
        <van-tabbar-item icon="search" name="community">My Community</van-tabbar-item>
      </router-link>
      <router-link to="/proprietormine" style="width: 33%">
        <van-tabbar-item icon="friends-o" name="mine">Mine</van-tabbar-item>
      </router-link>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "ProprietorHome",
  data() {
    return {
      active: 'mine'
    }
  }
}
</script>

<style scoped>

</style>