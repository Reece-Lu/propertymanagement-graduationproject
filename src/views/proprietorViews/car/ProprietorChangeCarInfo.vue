<template>
  <div style=" background-color: rgb(244, 244, 245); height: 100vh;">

    <van-nav-bar
        title="车辆信息修改"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-cell-group title="我的车辆" style="background: rgb(244, 244, 245)">
      <van-cell-group inset v-for="data in carListData" :key="data.id" style="margin-top:1vh">
        <van-cell center  size="large">
          <van-row>
            <van-col span="12">车牌号:</van-col>
            <van-col span="12">{{data.licensePlate}}</van-col>
          </van-row>
          <van-row>
            <van-col span="12">停车位:</van-col>
            <van-col span="12">{{data.parkingSpace}}</van-col>
          </van-row>
          <van-row>
            <van-col span="12">颜色:</van-col>
            <van-col span="12">{{data.colour}}</van-col>
          </van-row>

          <van-button plain hairline type="info" size="mini" style="width: 10vh;margin-left: calc(50% - 5vh); padding:1vh">修改</van-button>

        </van-cell>

      </van-cell-group>
    </van-cell-group>



  </div>
</template>

<script>
import {proprietorSearchCar} from "@/api/Car";

export default {
  name: "ProprietorChangeCarInfo",
  data(){
    return{
    carListData:[{
      licensePlate:"",
      parkingSpace:"",
      colour:""
    }]
    }
  },
  created() {
    this.load()
  },
  methods:{
    onClickLeft(){
      this.$router.push('/proprietormine')
    },
    load(){
      this.proprietor=JSON.parse(localStorage.getItem('user'))
      proprietorSearchCar(this.proprietor.id).then(res=>{
          this.carListData=res
      })
    }
  }
}
</script>

<style scoped>

</style>
