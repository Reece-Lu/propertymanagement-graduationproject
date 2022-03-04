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
    <van-cell is-link title="修改个人信息信息" @click="editInfoShow = true" />
    <van-cell title="登出" is-link @click="logout"/>
  </van-cell-group>

</div>
</template>

<script>
import {getProprietorInfo} from "@/api/proprietorInfo";

export default {
  name: "ProprietorMine",

  data(){
    return{
      editInfoShow:false,
      proprietor:[{
        id:0
      }],
      id:'0',

    }
  },
  created() {
    this.proprietor=JSON.parse(localStorage.getItem('user'))

    getProprietorInfo(this.proprietor.id).then(res=>{
      console.log(res)
      this.proprietor=res
    })

  },
  methods:{
    logout(){
      this.$router.push('/login')
      localStorage.removeItem('isLogin');
      localStorage.removeItem('user');
    }
  }
}
</script>

<style scoped>
.content {
  padding: 16px 16px 160px;
}
</style>
