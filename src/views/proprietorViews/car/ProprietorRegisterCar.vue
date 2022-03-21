<template>

    <div style=" background-color: rgb(244, 244, 245); height: 100vh;">

      <van-nav-bar
          title="车辆登记"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
      />

      <van-form  style="margin-top: 3vh" @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="master" name="master" label="车主："/>
          <van-field v-model="registerForm.licensePlate" name="licensePlate" label="车牌号："/>
          <van-field v-model="registerForm.parkingSpace" name="parkingSpace" label="停车位："/>
          <van-field v-model="registerForm.colour" name="colour" label="颜色："/>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
</template>

<script>
import {proprietorRegisterCar} from "@/api/Car";

export default {
  name: "ProprietorRegisterCar",
  data(){
    return{
      registerForm:{
        masterId:'',
        licensePlate:"",
        parkingSpace:"",
        colour:"",
      },
      master:""
    }
  },
  created(){
    this.proprietor=JSON.parse(localStorage.getItem('user'))
    this.registerForm.masterId=this.proprietor.id
    this.master=this.proprietor.name
  },
  methods:{
    onClickLeft(){
      this.$router.push('/proprietorcommunity')
    },
    onSubmit(){
      proprietorRegisterCar(this.registerForm).then(()=>{
        this.timer = setTimeout(()=>{   //设置延迟执行
          this.$router.push('/proprietorcommunity')
        },1000);
      })}
    }
}
</script>

<style scoped>

</style>
