<template>

  <div style=" background-color: rgb(244, 244, 245); height: 100vh;">
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft"/>

    <van-form @submit="onSubmit" style="margin-top: 2vh">

      <van-cell-group inset>
      <van-field v-model="userName" name="userName" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]"/>
      <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]"/>
      <van-field v-model="passwordVerify" type="password" name="passwordVerify" label="确认密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]"/>
      <van-field v-model="name" name="name" label="姓名" placeholder="姓名" :rules="[{ required: true, message: '请填写您的姓名' }]"/>
        <van-field readonly clickable name="title" :value="title" label="选择称呼" placeholder="点击选择称呼" @click="showTitlePicker = true"/>
      <van-field v-model="email" name="email" label="邮箱" placeholder="邮箱" :rules="[{message: '请填写您的邮箱' }]"/>
      <van-field v-model="weChat" name="weChat" label="微信号" placeholder="微信号" :rules="[{ required: true, message: '请填写您的邮箱' }]"/>
      <van-field v-model="building" name="building" label="楼号" placeholder="楼号" :rules="[{ required: true, message: '请填写您的楼号' }]"/>
      <van-field v-model="door" name="door" label="门牌号" placeholder="门牌号" :rules="[{ required: true, message: '请填写您的门牌号' }]"/>
      <van-field readonly clickable name="roleInFamily" :value="roleInFamily" label="选择家庭角色" placeholder="点击选择家庭角色" @click="showRolePicker = true"/>
      <van-field v-model="phone" name="phone" label="手机号" placeholder="手机号" :rules="[{ required: true, message: '请填写您的手机号' }]"/>
      </van-cell-group>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交并验证</van-button>
      </div>
    </van-form>

    <van-popup v-model="showRolePicker" position="bottom">
      <van-picker
          show-toolbar
          :columns="RoleColumns"
          @confirm="onRoleConfirm"
          @cancel="showRolePicker = false"
      />
    </van-popup>

    <van-popup v-model="showTitlePicker" position="bottom">
      <van-picker
          show-toolbar
          :columns="TitleColumns"
          @confirm="onTitleColumns"
          @cancel="showTitlePicker = false"
      />
    </van-popup>

    <van-popup v-model="showSMS" round position="bottom" :style="{ height: '80%' }" :close-on-click-overlay=false closeable>

      <van-row style="margin-top: 20%;text-align: center">
        <van-col span="12">验证码已发送至：</van-col>
        <van-col span="12">{{this.phone}}</van-col>
      </van-row>

      <van-cell-group style="margin: 10% auto;width: 80%">
        <van-field v-model="code" placeholder="请输入验证码" />
      </van-cell-group>

      <van-button round block type="info" @click="submitSMS">验证</van-button>


    </van-popup>

  </div>
</template>

<script>

import {checkPhoneNumberIsUsed, proprietorRegister} from "@/api/Login";

export default {
  name: "ProprietorRegister",
  data() {
    return {

      userName:'',
      password:"",
      name:"",
      title:"",
      phone:"",
      email:"",
      weChat:"",
      building:"",
      door:"",
      roleInFamily:"",
      code:"",
      passwordVerify:"",
      showRolePicker:false,
      showTitlePicker:false,
      RoleColumns:['爸爸','妈妈','女儿','儿子','爷爷','奶奶','叔叔','阿姨','其他'],
      TitleColumns:['女士','先生','小朋友','爷爷','奶奶'],
      showSMS:false,
      verifyPhone:{
        phoneNum:""
      },
      proprietorInfo:{
        building: "",
        code: "",
        door: "",
        email: "",
        name: "",
        password: "",
        passwordVerify: "",
        phone: "",
        roleInFamily: "",
        title: "",
        userName: "",
        weChat: ""
      },
    };
  },
  methods:{
    onClickLeft(){
      this.$router.push('/login')
    },
    onRoleConfirm(value) {
      this.roleInFamily=value
      this.showRolePicker = false;
    },
    onTitleColumns(value) {
      this.title=value
      this.showTitlePicker = false;
    },
    onSubmit(values) {
      this.proprietorInfo.building=values.building
      this.proprietorInfo.door=values.door
      this.proprietorInfo.email=values.email
      this.proprietorInfo.name=values.name
      this.proprietorInfo.password=values.password
      this.proprietorInfo.passwordVerify=values.passwordVerify
      this.proprietorInfo.phone=values.phone
      this.proprietorInfo.roleInFamily=values.roleInFamily
      this.proprietorInfo.title=values.title
      this.proprietorInfo.userName=values.userName
      this.proprietorInfo.weChat=values.weChat
      console.log(this.proprietorInfo);
      if(this.password!==this.passwordVerify){
        this.$notify({ type: 'success', message: '密码输入错误' });
      }else{
        this.verifyPhone.phoneNum=this.phone
        console.log(this.verifyPhone)
        checkPhoneNumberIsUsed(this.verifyPhone).then(res=>{
          if(res.code==="600"){
            this.$notify({ type: 'danger', message: '手机号已被注册' });
          }else{
            this.showSMS=true
          }
        })
      }

    },
    submitSMS(){
      this.proprietorInfo.code=this.code
      proprietorRegister(this.proprietorInfo).then(res=>{
        if(res.code==="600"){
          this.$notify({ type: 'danger', message: '验证码错误' });
        }else{
          this.$notify({ type: 'success', message: '注册成功' });
          this.showSMS=false;
          this.$router.push('/login')
        }

      })


    }
  }
}
</script>

<style scoped>

</style>
