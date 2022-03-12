<template>
<div style=" background-color: rgb(244, 244, 245); height: 100vh;">

  <van-nav-bar
      title="报修申请"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
<!-- 新建的维修表单 -->
  <van-form  style="margin-top: 3vh" @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="reportForm.reporter" name="reporter" label="填报人"/>
      <van-field v-model="reportForm.reporterPhone" name="reporterPhone" label="电话"/>
      <van-field v-model="reportForm.reportTime" name="reportTime" label="填报时间"/>
      <van-field readonly clickable name="repairType" :value="reportForm.repairType" label="维修类型" placeholder="点击选择维修类型" @click="showRepairTypePicker = true"/>
      <van-field v-model="reportForm.repairLocation" rows="1" autosize name="repairLocation" label="维修地址" type="textarea" placeholder="请输入维修地址"/>
      <van-field v-model="reportForm.repairDescription" rows="2" autosize name="repairDescription" label="维修描述" type="textarea" maxlength="100" placeholder="请输入关于维修的描述" show-word-limit/>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>

  <!--选择维修属性弹窗-->
  <van-popup v-model="showRepairTypePicker" position="bottom">
    <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showRepairTypePicker = false"/>
  </van-popup>

</div>
</template>

<script>
import {createReport} from "@/api/ReportAndRepair";

export default {
  name: "CreateFixingReport" ,
  data(){
    return{
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
      reportForm:{
        reporter:'',
        reporterId:'',
        reporterPhone:'',
        reportTime:'',
        repairType:'',
        repairLocation:'',
        repairDescription:'',
        repairStatus:'待派发'
      },
      timer: null,
      nowWeek: '',
      nowDate: '',
      nowTime: '',
      showRepairTypePicker:false,
      columns: ['水', '电', '暖气', '煤气', '公共设施','环境','其他'],
    }
  },
  created() {
    //默认值赋值，并展示
    this.proprietor=JSON.parse(localStorage.getItem('user'))
    console.log("localStorage:"+this.proprietor)
    this.reportForm.reporter=this.proprietor.name
    this.reportForm.reporterPhone=this.proprietor.phone
    this.reportForm.reporterId=this.proprietor.id
    this.setNowTimes()
    this.reportForm.reportTime=this.nowDate+" "+this.nowTime
  },
  methods: {
    onClickLeft() {
      //返回主分支页
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
    //维修类型repairType复选框关闭按钮
    onConfirm(value) {
      this.reportForm.repairType = value;
      this.showRepairTypePicker = false;
    },
    //提交表单
    onSubmit() {
      createReport(this.reportForm).then(()=>{
        this.$notify({ type: 'success', message: '提交成功' });
        this.timer = setTimeout(()=>{   //设置延迟执行
          this.$router.push('/proprietorcommunity')
        },500);

      })
    },
  }
}
</script>

<style scoped>
body{

}
</style>
