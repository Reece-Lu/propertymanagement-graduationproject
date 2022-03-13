<template>
  <div style=" background-color: rgb(244, 244, 245); height: 100vh;">
    <van-nav-bar
        title="报修记录"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-list>
        <van-cell style=" background-color: rgb(244, 244, 245);" v-for="data in fixingReportList" :key="data.id">
          <van-cell-group inset>
            <van-cell center clickable size="large">
              <van-row>
                <van-col span="10">填报人:</van-col>
                <van-col span="14">{{data.reporter}}</van-col>
              </van-row>
              <van-row>
                <van-col span="10">维修状态:</van-col>
                <van-col span="14"><van-tag round type="success">{{data.repairStatus}}</van-tag></van-col>
              </van-row>
              <van-row>
                <van-col span="10">填报时间: </van-col>
                <van-col span="14">{{data.reportTime}}</van-col>
              </van-row>
              <van-row>
                <van-col span="10">维修地点: </van-col>
                <van-col span="14">{{data.repairLocation}}</van-col>
              </van-row>
              <van-row>
                <van-col span="10">维修人:</van-col>
                <van-col span="14"> <van-tag plain type="primary">{{data.serviceman}}</van-tag></van-col>
              </van-row>
              <van-row>
                <van-col span="10">维修描述: </van-col>
                <van-col span="14">{{data.repairDescription}}</van-col>
              </van-row>


            </van-cell>
          </van-cell-group>
        </van-cell>


    </van-list>
  </div>

<!--  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">-->


</template>

<script>
import {checkFixingReportList} from "@/api/ReportAndRepair";

export default {
  name: "CheckFixingReport",
  data(){
    return{
      row:'',
      reporterId:'',
      fixingReportList:[{}],
      proprietor:[{}],
    }
  },
  created() {
    this.proprietor = JSON.parse(localStorage.getItem('user'));
    this.reporterId=this.proprietor.id
    checkFixingReportList(this.reporterId).then(res=>{
      this.fixingReportList=res
      console.log(this.fixingReportList)
    })
  },
  methods:{
    onClickLeft() {
      //返回主分支页
      this.$router.push('/proprietorcommunity')
    },
    showDetails(row){
      console.log(row)
    }
  }
}
</script>

<style scoped>

</style>
