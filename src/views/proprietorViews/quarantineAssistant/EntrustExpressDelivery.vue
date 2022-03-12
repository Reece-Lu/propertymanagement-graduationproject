<template>
  <div style=" background-color: rgb(244, 244, 245); height: 100vh;">
    <van-nav-bar
        title="快递代领"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <!-- 快递代领申请 -->
    <van-form  style="margin-top: 3vh" @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="name" name="name" label="填报人"/>
        <van-field v-model="proprietorPhone" name="proprietorPhone" label="电话"/>
        <van-field v-model="reportForm.deliveryType" name="deliveryType" label="快递类型"/>
        <van-field readonly clickable name="repairType" :value="reportForm.deliveryLocation" label="存放地点" placeholder="点击选择快递存放地点" @click="showDeliveryLocationPicker = true"/>
        <van-field v-model="reportForm.deliveryCode" name="deliveryCode" label="取件码"/>
        <van-field v-model="reportForm.createDate" name="reportTime" label="填报时间"/>


      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <!--选择维修属性弹窗-->
    <van-popup v-model="showDeliveryLocationPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showDeliveryLocationPicker = false"/>
    </van-popup>


  </div>

</template>

<script>
import {entrustExpressDeliveryForProprietor} from "@/api/ExpressDelivery";

export default {
  name: "ExpressDelivery",
  data(){
    return{
      reportForm:{
        proprietorId:'',
        deliveryType:"",
        deliveryLocation:"",
        deliveryCode:"",
        createDate:"",
        status:""
      },
      proprietor:[{
        id:'',
        name:'',
        title:'',
        phone:'',
        email:'',
        weChat:'',
        building:'',
        door:'',
        roleInFamily:''
      }],
      name:"",
      timer: null,
      nowDate: '',
      nowTime: '',
      proprietorPhone:'',
      showDeliveryLocationPicker:false,
      columns: ['丰巢柜', '菜鸟驿站', '门卫', '小区超市', '近领宝'],
    }
  },
  created() {
    //默认值赋值，并展示
    this.proprietor=JSON.parse(localStorage.getItem('user'))
    console.log("localStorage:"+this.proprietor)
    this.reportForm.proprietorId=this.proprietor.id
    this.name=this.proprietor.name
    this.proprietorPhone=this.proprietor.phone
    this.setNowTimes()
    this.reportForm.createDate=this.nowDate+" "+this.nowTime
    this.reportForm.status="待派发取件任务"
  },
  methods:{
    onClickLeft(){
      this.$router.push('/proprietorcommunity')
    },
    setNowTimes () {
      //获取当前时间，存入ReportTime
      let myDate = new Date()
      let yy = String(myDate.getFullYear())
      let mm = myDate.getMonth() + 1
      let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
      let min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
      let sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
      this.nowDate = yy + '-' + mm + '-' + dd
      this.nowTime = hou + ':' + min + ':' + sec
    },
    onConfirm(value) {
      this.reportForm.deliveryLocation = value;
      this.showDeliveryLocationPicker = false;
    },
    onSubmit() {
      entrustExpressDeliveryForProprietor(this.reportForm).then(()=>{
         this.$notify({ type: 'success', message: '提交成功' });

        this.timer = setTimeout(()=>{   //设置延迟执行
          this.$router.push('/proprietorcommunity')
        },1000);
      })
    },

  }
}
</script>

<style scoped>

</style>
