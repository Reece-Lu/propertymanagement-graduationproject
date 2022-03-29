<template>

  <div style="height:100%">
    <div style="height: 5vh"/>

    <van-swipe class="my-swipe" :autoplay="800" indicator-color="white" style=" margin-bottom: 3vh;">
      <van-swipe-item>后疫情</van-swipe-item>
      <van-swipe-item>时代</van-swipe-item>
      <van-swipe-item>物业</van-swipe-item>
      <van-swipe-item>管理</van-swipe-item>
      <van-swipe-item>系统</van-swipe-item>
    </van-swipe>

    <p style="margin-left: 2vh;font-size:15px">小区通知：</p>
    <van-list>
        <van-cell-group inset v-for="data in broadcastTable" :key="data.id"  style="margin-bottom: 1vh">
          <van-field v-model="data.issueName" readonly  rows="1" autosize  type="textarea"></van-field>
          <van-field label="发布时间"  v-model="data.createDate" readonly  rows="1" autosize  type="textarea"></van-field>
          <van-field label="内容"  v-model="data.content" readonly  rows="1" autosize  type="textarea"></van-field>
          <van-field label="事件等级"  v-model="data.importanceLevel" readonly  rows="1" autosize  type="textarea"></van-field>
        </van-cell-group>
    </van-list>

  </div>
</template>

<script>
import {generalSearchBroadcast} from "@/api/Broadcast";



export default {
  name: "ProprietorBroadcast",
  data(){
    return{
      broadcastTable:[{
        id:'',
        createManagerId:'',
        importanceLevel:'',
        issueName:'',
        content:'',
        createDate:'',
      }],
    }
  },
  created() {
    this.load();
  },
  methods:{
    load(){
      generalSearchBroadcast().then(res=>{
        this.broadcastTable=res
        console.log(this.broadcastTable)
      })
    },
  }
}
</script>

<style scoped>

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}


</style>
