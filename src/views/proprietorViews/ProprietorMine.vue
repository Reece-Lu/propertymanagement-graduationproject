<template>
<div>
  <van-nav-bar title=""/>
  <div id="emptyBox" style="height: 2vh"></div>

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

  <!--修改个人信息编辑页面-->
  <van-popup v-model="editInfoShow" round position="bottom" closeable :style="{ height: '80%' }">
    <van-cell-group inset title="设置" @click='changeNameShow=true'>
      <van-cell  title="修改姓名" is-link>{{this.proprietor.name}}</van-cell>
    </van-cell-group>
    <van-cell-group inset @click='changeTitleShow=true'>
      <van-cell  title="修改称谓" is-link>{{this.proprietor.title}}</van-cell>
    </van-cell-group>
    <van-cell-group inset @click='changePhoneShow=true'>
      <van-cell  title="修改电话" is-link>{{this.proprietor.phone}}</van-cell>
    </van-cell-group>
    <van-cell-group inset @click='changeEmailShow=true'>
      <van-cell  title="修改邮箱" is-link>{{this.proprietor.email}}</van-cell>
    </van-cell-group>
    <van-cell-group inset @click='changeWeChatShow=true'>
      <van-cell  title="修改微信号" is-link>{{this.proprietor.weChat}}</van-cell>
    </van-cell-group>
    <van-cell-group inset @click='changeDoorShow=true'>
      <van-cell  title="修改门牌号" is-link>{{this.proprietor.door}}</van-cell>
    </van-cell-group>
    <van-cell-group inset @click='changeBuildingShow=true'>
      <van-cell  title="修改楼号" is-link>{{this.proprietor.building}}</van-cell>
    </van-cell-group>
    <van-cell-group inset @click='changeRoleInFamilyShow=true'>
      <van-cell  title="修改家庭身份" is-link>{{this.proprietor.roleInFamily}}</van-cell>
    </van-cell-group>

  </van-popup>

<!--修改姓名弹窗-->
  <van-dialog v-model="changeNameShow" title="更改姓名" :showConfirmButton=false>
    <van-cell-group>
      <van-form @submit="submitName">
        <van-field  v-model="changeInfoBag.value" label="姓名" placeholder="请输入姓名" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认</van-button>
        </div>
      </van-form>
    </van-cell-group>
  </van-dialog>
<!--修改称谓弹窗-->
  <van-dialog v-model="changeTitleShow" title="更改称谓" :showConfirmButton=false>
    <van-cell-group>
      <van-form @submit="submitTitle">
        <van-field  v-model="changeInfoBag.value" label="称谓" placeholder="请输入称谓" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认</van-button>
        </div>
      </van-form>
    </van-cell-group>
  </van-dialog>
<!--修改手机号弹窗-->
  <van-dialog v-model="changePhoneShow" title="更改电话" :showConfirmButton=false>
    <van-cell-group>
      <van-form @submit="submitPhone">
        <van-field  v-model="changeInfoBag.value" label="电话" placeholder="请输入电话" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认</van-button>
        </div>
      </van-form>
    </van-cell-group>
  </van-dialog>
<!--修改邮箱弹窗-->
  <van-dialog v-model="changeEmailShow" title="更改邮箱" :showConfirmButton=false>
    <van-cell-group>
      <van-form @submit="submitEmail">
        <van-field  v-model="changeInfoBag.value" label="邮箱" placeholder="请输入邮箱" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认</van-button>
        </div>
      </van-form>
    </van-cell-group>
  </van-dialog>
<!--修改微信号-->
  <van-dialog v-model="changeWeChatShow" title="更改危险号" :showConfirmButton=false>
    <van-cell-group>
      <van-form @submit="submitWeChat">
        <van-field  v-model="changeInfoBag.value" label="维修" placeholder="请输入微信号" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认</van-button>
        </div>
      </van-form>
    </van-cell-group>
  </van-dialog>
<!-- 修改门牌号弹窗-->
  <van-dialog v-model="changeDoorShow" title="更改门牌号" :showConfirmButton=false>
    <van-cell-group>
      <van-form @submit="submitDoor">
        <van-field  v-model="changeInfoBag.value" label="门牌号" placeholder="请输入门牌号" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认</van-button>
        </div>
      </van-form>
    </van-cell-group>
  </van-dialog>
<!--修改楼号弹窗-->
  <van-dialog v-model="changeBuildingShow" title="更改楼号" :showConfirmButton=false>
    <van-cell-group>
      <van-form @submit="submitBuilding">
        <van-field  v-model="changeInfoBag.value" label="楼号" placeholder="请输入楼号" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认</van-button>
        </div>
      </van-form>
    </van-cell-group>
  </van-dialog>
<!--修改家庭角色弹窗-->
  <van-dialog v-model="changeRoleInFamilyShow" title="更改家庭角色" :showConfirmButton=false>
    <van-cell-group>
      <van-form @submit="submitRoleInFamily">
        <van-field  v-model="changeInfoBag.value" label="家庭角色" placeholder="请输入家庭角色" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认</van-button>
        </div>
      </van-form>
    </van-cell-group>
  </van-dialog>



</div>
</template>

<script>
import {changeProprietorInfo, getProprietorInfo} from "@/api/ProprietorInfo";

export default {
  name: "ProprietorMine",

  data(){
    return{
      editInfoShow:false,
      changeNameShow:false,
      changeTitleShow:false,
      changePhoneShow:false,
      changeEmailShow:false,
      changeWeChatShow:false,
      changeDoorShow:false,
      changeBuildingShow:false,
      changeRoleInFamilyShow:false,
      proprietor:[{
        name:'',
        title:'',
        phone:'',
        email:'',
        weChat:'',
        building:'',
        door:'',
        roleInFamily:''
      }],
      id:'0',
      //接口数据包，账号、属性、修改值
      changeInfoBag:{
        id:'',
        attribute:'',
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
    //修改个人信息上滑弹窗
    showFormUp(){
      this.editInfoShow=true;
    },
    //更改姓名
    submitName(){
      this.changeInfoBag.id=this.proprietor.id
      this.changeInfoBag.attribute=1
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value=''
      this.changeNameShow=false
      this.timer = setTimeout(()=>{   //设置延迟执行
        this.load()
      },500);
    },
    submitTitle(){
      this.changeInfoBag.id=this.proprietor.id
      this.changeInfoBag.attribute=2
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value=''
      this.changeTitleShow=false
      this.timer = setTimeout(()=>{   //设置延迟执行
        this.load()
      },500);
    },
    submitPhone(){
      this.changeInfoBag.id=this.proprietor.id
      this.changeInfoBag.attribute=3
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value=''
      this.changePhoneShow=false
      this.timer = setTimeout(()=>{   //设置延迟执行
        this.load()
      },500);
    },
    submitEmail(){
      this.changeInfoBag.id=this.proprietor.id
      this.changeInfoBag.attribute=4
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value=''
      this.changeEmailShow=false
      this.timer = setTimeout(()=>{   //设置延迟执行
        this.load()
      },500);
    },
    submitWeChat(){
      this.changeInfoBag.id=this.proprietor.id
      this.changeInfoBag.attribute=5
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value=''
      this.changeWeChatShow=false
      this.timer = setTimeout(()=>{   //设置延迟执行
        this.load()
      },500);
    },
    submitDoor(){
      this.changeInfoBag.id=this.proprietor.id
      this.changeInfoBag.attribute=6
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value=''
      this.changeDoorShow=false
      this.timer = setTimeout(()=>{   //设置延迟执行
        this.load()
      },500);
    },
    submitBuilding(){
      this.changeInfoBag.id=this.proprietor.id
      this.changeInfoBag.attribute=7
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value=''
      this.changeBuildingShow=false
      this.timer = setTimeout(()=>{   //设置延迟执行
        this.load()
      },500);
    },
    submitRoleInFamily(){
      this.changeInfoBag.id=this.proprietor.id
      this.changeInfoBag.attribute=8
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value=''
      this.changeRoleInFamilyShow=false
      this.timer = setTimeout(()=>{   //设置延迟执行
        this.load()
      },500);
    },

  }
}
</script>

<style scoped>
.content {
  padding: 16px 16px 160px;
}
</style>
