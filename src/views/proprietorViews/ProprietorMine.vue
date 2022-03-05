<template>
<div>
  <div id="emptyBox" style="height: 5vh"></div>

  <van-cell-group>
    <van-cell>
      <van-row>
        <van-col span="12">
          <van-image round width="8rem" height="8rem" src="https://img01.yzcdn.cn/vant/cat.jpeg" fit="cover"/>
        </van-col>
        <van-col span="12">
          <van-cell-group>
            <van-cell>{{proprietor.name}}{{proprietor.title}}</van-cell>
            <van-cell>{{proprietor.building}}栋</van-cell>
            <van-cell>{{proprietor.door}}室</van-cell>
          </van-cell-group>
        </van-col>
      </van-row>
    </van-cell>
  </van-cell-group>

  <van-cell-group inset title="基础信息">
    <van-cell title="Phone:">{{proprietor.phone}}</van-cell>
    <van-cell title="微信号:">{{proprietor.weChat}}</van-cell>
    <van-cell title="邮箱:">{{proprietor.email}}</van-cell>
    <van-cell title="家庭身份:">{{proprietor.roleInFamily}}</van-cell>
    <van-cell title="车位号:">{{proprietor.id}}</van-cell>
    <van-cell title="车牌号:">{{proprietor.id}}</van-cell>

  </van-cell-group>

  <van-cell-group inset title="设置">
    <van-cell  title="修改个人信息信息" is-link @click="showFormUp"/>
    <van-cell title="登出" is-link @click="logout"/>
  </van-cell-group>

<!--编辑页面-->
  <van-popup v-model="editInfoShow" round position="bottom" closeable :style="{ height: '80%' }">
    <van-cell-group inset title="设置" @click='changeNameShow=true'>
      <van-cell  title="修改姓名" is-link @click="showFormUp">{{this.proprietor.name}}</van-cell>
    </van-cell-group>
  </van-popup>


  <van-dialog v-model="changeNameShow" title="更改姓名" :showConfirmButton=false>
    <van-cell-group>
      <van-form @submit="submitName">
        <van-field  v-model="editInfoDTO.value" label="姓名" placeholder="请输入姓名" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认</van-button>
        </div>
      </van-form>
    </van-cell-group>
  </van-dialog>



</div>
</template>

<script>
import {getProprietorInfo} from "@/api/proprietorInfo";

export default {
  name: "ProprietorMine",

  data(){
    return{
      editInfoShow:false,
      changeNameShow:false,
      proprietor:[{
        name:''
      }],
      id:'0',
      editInfoDTO:{
        attributes:'',
        value:''
      },
      newName:'',
    }
  },
  created() {
    //加载"我的"页面数据信息
    this.load();
  },
  methods:{
    logout(){
      this.$router.push('/login')
      localStorage.removeItem('isLogin');
      localStorage.removeItem('user');
    },
    load(){
      //读取localstorage中的用户id
      this.proprietor=JSON.parse(localStorage.getItem('user'))
      //获取最新的业主信息
      getProprietorInfo(this.proprietor.id).then(res=>{
        console.log(res)
        this.proprietor=res
      })
    },
    showFormUp(){
      this.editInfoShow=true;
    },
    //更改姓名
    submitName(){
      console.log(this.editInfoDTO)
      this.editInfoDTO.attributes='name'

      this.load()
      this.changeNameShow=false
    }
  }
}
</script>

<style scoped>
.content {
  padding: 16px 16px 160px;
}
</style>
