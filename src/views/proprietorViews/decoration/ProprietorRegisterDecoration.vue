<template>
  <div style=" background-color: rgb(244, 244, 245); height: 100vh;">

    <van-nav-bar
        title="装修登记"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-cell-group inset title="输入装修信息">
      <van-cell title="业主姓名" :value="this.proprietorName" />
      <van-cell title="选择装修日期区间" is-link  @click="choseDateShow = true" />
      <van-cell title="楼号" :value="this.decorationFormData.building" />
      <van-cell title="门牌号" :value="this.decorationFormData.door" />
      <van-cell title="输入装修人员信息" is-link  @click="crewPopUpShow = true" />
    </van-cell-group>
<!--  施工日期选择器  -->
    <van-calendar v-model="choseDateShow" type="range" @confirm="onConfirm" :min-date="minDate" :max-date="maxDate"  color="#1989fa"  />
<!--  施工人员录入  -->
    <van-popup v-model="crewPopUpShow" round position="bottom" :style="{ height: '80%' }" closeable>
      <div style="height: 10%"/>
          <van-cell-group v-for="data in constructionCrewJason" :key="data.id"  inset>
            <van-cell center size="large">
              <van-row>
                <van-col span="8">姓名:</van-col>
                <van-col span="16">{{data.name}}</van-col>
              </van-row>
              <van-row>
                <van-col span="8">电话:</van-col>
                <van-col span="16">{{data.tel}}</van-col>
              </van-row>
            </van-cell>
          </van-cell-group>
        <van-button round type="info" style="width: 30vh;height:5vh; margin-left: calc(50% - 15vh);margin-top: 10vh" @click="addCrewPopUpShow=true">添加人员</van-button>
        <van-button round type="info" style="width: 30vh;height:5vh; margin-left: calc(50% - 15vh);margin-top: 1vh" @click="submitCrewList">保存</van-button>
    </van-popup>

    <!--  添加装修人员  -->
    <van-popup v-model="addCrewPopUpShow" round position="bottom" :style="{ height: '70%' }" closeable>
      <div style="height: 10%"/>
      <van-form @submit="addCrewOnSubmit">
        <van-field
            v-model="addConstructionCrewJason.name"
            name="姓名"
            placeholder="请输入姓名"
        />
        <van-field
            v-model="addConstructionCrewJason.tel"
            name="联系方式"
            placeholder="请输入电话"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup>


    <van-button round type="info" style="width: 30vh;height:5vh; margin-left: calc(50% - 15vh);margin-top: 20vh" @click="submitRegisterInfo">提交</van-button>
  </div>
</template>

<script>

import {proprietorRegisterDecoration} from "@/api/Decoration";

export default {
  name: "ProprietorRegisterDecoration",
  data(){
    return{
      decorationFormData:{
        proprietorId:'',
        startTime:'',
        endTime:'',
        building:'',
        door:'',
        constructionCrew:''
      },
      constructionCrewJason:[],
      addConstructionCrewJason:{
        id:'',
        name: '',
        tel: '',
      },
      proprietorName:'',
      choseDateShow : false,
      crewPopUpShow : false,
      addCrewPopUpShow : false,
      timer:null,
      crewNum:1,
      data:'',
      minDate: new Date(2022, 0, 1),
      maxDate: new Date(2042, 0, 31),
    }
  },
  created() {
    this.proprietor=JSON.parse(localStorage.getItem('user'))
    this.decorationFormData.proprietorId = this.proprietor.id
    this.proprietorName=this.proprietor.name
    this.decorationFormData.building=this.proprietor.building
    this.decorationFormData.door=this.proprietor.door
  },
  methods: {
    onClickLeft() {
      this.$router.push('/proprietorcommunity')
    },
    formatDate(date) {
      return `${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`;
    },
    //时间选择器
    onConfirm(date) {
      const [start, end] = date;
      this.choseDateShow = false;
      this.decorationFormData.startTime = `${this.formatDate(start)}`;
      this.decorationFormData.endTime = `${this.formatDate(end)}`;
    },
    //第二层popup提交
    addCrewOnSubmit(){
      this.addCrewPopUpShow = false
      this.addConstructionCrewJason.id=this.crewNum
      this.crewNum = this.crewNum + 1
      this.constructionCrewJason.push(this.addConstructionCrewJason)
      const a = JSON.stringify(this.constructionCrewJason);
      this.constructionCrewJason = JSON.parse(a);
      console.log(this.constructionCrewJason)
      this.addConstructionCrewJason.id=''
      this.addConstructionCrewJason.name=''
      this.addConstructionCrewJason.tel=''
    },
    //第一层popup提交
    submitCrewList(){
      this.crewPopUpShow = false
      this.decorationFormData.constructionCrew = JSON.stringify(this.constructionCrewJason)
      console.log(this.decorationFormData.constructionCrew)
    },
    //最终提交
    submitRegisterInfo(){
      proprietorRegisterDecoration(this.decorationFormData).then(res=>{
        console.log(res)
        this.timer = setTimeout(()=>{   //设置延迟执行
          this.$router.push('/proprietorcommunity')
        },1000);


      })
    }
  }
}
</script>

<style scoped>

</style>
