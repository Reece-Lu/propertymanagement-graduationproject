<template>
  <div style=" background-color: rgb(244, 244, 245); height: 100vh;">
    <van-nav-bar
        title="历史查询"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

<!--  下拉刷新功能  -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
<!--数据列表-->
      <van-list>
      <van-cell style=" background-color: rgb(244, 244, 245);" v-for="data in deliveryInfo" :key="data.id">
        <van-cell-group inset>
          <van-cell center clickable size="large">
            <van-row>
              <van-col span="10">包裹名:</van-col>
              <van-col span="14">{{data.deliveryType}}</van-col>
            </van-row>
            <van-row>
              <van-col span="10">包裹位置:</van-col>
              <van-col span="14"><van-tag round type="success">{{data.deliveryLocation}}</van-tag></van-col>
            </van-row>
            <van-row>
              <van-col span="10">取件码: </van-col>
              <van-col span="14">{{data.deliveryCode}}</van-col>
            </van-row>
            <van-row>
              <van-col span="10">委托时间: </van-col>
              <van-col span="14">{{data.createDate}}</van-col>
            </van-row>
            <van-row>
              <van-col span="10">状态:</van-col>
              <van-col span="14">{{data.status}}</van-col>
            </van-row>
            <van-row>
              <van-col span="10">派件人: </van-col>
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
import {TrackDeliveryInfoProprietor} from "@/api/ExpressDelivery";
import {Notify} from "vant";

export default {
  name: "TrackExpressDelivery",
  data(){
    return{
      proprietorId:'',
      isLoading: false,
      deliveryInfo:[{
        id:"",
        deliveryType:"",
        deliveryLocation:"",
        deliveryCode:"",
        createDate:"",
        status:"",
        serviceman:"",
      }],
    }
  },
  created() {
    const proprietor =JSON.parse(localStorage.getItem('user'));
    this.proprietorId = proprietor.id
    this.load()
  },
  //返回箭头键
  methods:{
    onClickLeft(){
      this.$router.push('/proprietorcommunity')
    },
    load(){
      TrackDeliveryInfoProprietor(this.proprietorId).then(res=>{
        this.deliveryInfo=res
      })
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        Notify({ type: 'success', message: '刷新成功' });
        this.isLoading = false;
        this.load()
      }, 1000);
    },
  }
}
</script>

<style scoped>

</style>
