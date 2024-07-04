<template>
  <div style="height: 100vh">
    <van-nav-bar title="My Community"/>

    <van-cell-group inset title="Repair and Maintenance">
      <van-cell title="Repair Request" is-link to="/proprietorhome/createfixingreport"/>
      <van-cell title="Repair Records" is-link to="/proprietorhome/checkfixingreport"/>
    </van-cell-group>

    <van-cell-group inset title="Quarantine Assistant">
      <van-cell title="Proxy Pickup" is-link to="/proprietorhome/createexpressdelivery"/>
      <van-cell title="History Inquiry" is-link to="/proprietorhome/trackexpressdelivery"/>
    </van-cell-group>

    <van-cell-group inset title="Other Services">
      <van-cell title="Pet Registration" is-link to="/proprietorhome/registerpet"/>
      <van-cell title="Car Registration" is-link to="/proprietorhome/proprietorregistercar"/>
      <van-cell title="Decoration Registration" is-link to="/proprietorhome/proprietorregisterdecoration"/>
    </van-cell-group>

  </div>
</template>

<script>
export default {
  name: "ProprietorCommunity",
  data() {
    return {

    }
  },
}
</script>

<style scoped>

</style>
