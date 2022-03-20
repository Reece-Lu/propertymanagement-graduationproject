<template>
  <div style=" background-color: rgb(244, 244, 245); height: 100vh;">
    <van-nav-bar
        title="宠物登记"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-form  style="margin-top: 3vh" @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="master" name="master" label="主人"/>
        <van-field v-model="registerForm.petName" name="name" label="宠物姓名"/>
        <van-field v-model="registerForm.age" name="age" label="年龄"/>
        <van-field v-model="registerForm.species" name="species" label="品种"/>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

import {ProprietorRegisterPet} from "@/api/Pet";

export default {
  name: "RegisterPet",
  data(){
    return{
      registerForm:{
        masterId:"",
        petName:"",
        age:"",
        createDate:"",
        species:""
      },
      master:"",
      timer: null,
      nowDate: '',
      nowTime: '',
    }
  },
  created() {
    this.registerForm.masterId=this.$store.getters.getUserId
    this.master=this.$store.getters.getName
    this.setNowTimes()
    this.registerForm.createDate=this.nowDate+" "+this.nowTime
    console.log(this.registerForm.createDate)
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
    onSubmit() {
      ProprietorRegisterPet(this.registerForm).then(()=>{
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
