<template>
  <div style="background-color: rgb(244, 244, 245); height: 100vh;">
    <van-nav-bar
        title="History Lookup"
        left-text="Back"
        left-arrow
        @click-left="onClickLeft"
    />

    <!-- Pull to Refresh functionality -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- Data List -->
      <van-list>
        <van-cell style="background-color: rgb(244, 244, 245);" v-for="data in deliveryInfo" :key="data.id">
          <van-cell-group inset>
            <van-cell center clickable size="large">
              <van-row>
                <van-col span="10">Package Name:</van-col>
                <van-col span="14">{{data.deliveryType}}</van-col>
              </van-row>
              <van-row>
                <van-col span="10">Package Location:</van-col>
                <van-col span="14"><van-tag round type="success">{{data.deliveryLocation}}</van-tag></van-col>
              </van-row>
              <van-row>
                <van-col span="10">Pickup Code: </van-col>
                <van-col span="14">{{data.deliveryCode}}</van-col>
              </van-row>
              <van-row>
                <van-col span="10">Entrust Time: </van-col>
                <van-col span="14">{{data.createDate}}</van-col>
              </van-row>
              <van-row>
                <van-col span="10">Status:</van-col>
                <van-col span="14">{{data.status}}</van-col>
              </van-row>
              <van-row>
                <van-col span="10">Serviceman: </van-col>
                <van-col span="14">{{data.serviceman}}</van-col>
              </van-row>
            </van-cell>
          </van-cell-group>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { TrackDeliveryInfoProprietor } from "@/api/ExpressDelivery";
import { Notify } from "vant";

export default {
  name: "TrackExpressDelivery",
  data() {
    return {
      proprietorId: '',
      isLoading: false,
      deliveryInfo: [{
        id: "",
        deliveryType: "",
        deliveryLocation: "",
        deliveryCode: "",
        createDate: "",
        status: "",
        serviceman: "",
      }],
    }
  },
  created() {
    const proprietor = JSON.parse(localStorage.getItem('user'));
    this.proprietorId = proprietor.id
    this.load()
  },
  methods: {
    // Back button
    onClickLeft() {
      this.$router.push('/proprietorcommunity')
    },
    load() {
      TrackDeliveryInfoProprietor(this.proprietorId).then(res => {
        this.deliveryInfo = res
      })
    },
    // Pull to refresh
    onRefresh() {
      setTimeout(() => {
        Notify({ type: 'success', message: 'Refresh successful' });
        this.isLoading = false;
        this.load()
      }, 1000);
    },
  }
}
</script>

<style scoped>

</style>
