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
              <van-cell>{{proprietor.building}} Building</van-cell>
              <van-cell>{{proprietor.door}} Room</van-cell>
            </van-cell-group>
          </van-col>
        </van-row>
      </van-cell>
    </van-cell-group>

    <van-cell-group inset title="Basic Information">
      <van-cell title="Phone:">{{proprietor.phone}}</van-cell>
      <van-cell title="WeChat:">{{proprietor.weChat}}</van-cell>
      <van-cell title="Email:">{{proprietor.email}}</van-cell>
      <van-cell title="Role in Family:">{{proprietor.roleInFamily}}</van-cell>
      <van-cell title="License Plate:">{{licensePlate}}</van-cell>
      <van-cell title="Parking Space:">{{parkingSpace}}</van-cell>
    </van-cell-group>

    <van-cell-group inset title="My Pets">
      <van-collapse v-for="data in petTable" :key="data.id"  v-model="activeName" accordion>
        <van-collapse-item :title="data.petName" :name="data.id">
          <van-cell center clickable size="large">
            <van-row>
              <van-col span="12">Age:</van-col>
              <van-col span="12">{{data.age}}</van-col>
            </van-row>
            <van-row>
              <van-col span="12">Species:</van-col>
              <van-col span="12"><van-tag round type="success">{{data.species}}</van-tag></van-col>
            </van-row>
          </van-cell>
          <van-button plain hairline type="info" size="mini" style="width: 10vh;margin-left: calc(50% - 5vh); padding:1vh" @click="openChangePetInfoForm(data)">Edit</van-button>
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>

    <van-cell-group inset title="Settings">
      <van-cell title="Edit Personal Information" is-link @click="showFormUp"/>
      <van-cell title="Edit Car Information" is-link @click="toChangeCarInfo"/>
      <van-cell title="Logout" is-link @click="logout"/>
    </van-cell-group>

    <!-- Edit personal information popup -->
    <van-popup v-model="editInfoShow" round position="bottom" closeable :style="{ height: '80%' }">
      <van-cell-group inset title="Settings" @click='changeNameShow=true'>
        <van-cell title="Edit Name" is-link>{{this.proprietor.name}}</van-cell>
      </van-cell-group>
      <van-cell-group inset @click='changeTitleShow=true'>
        <van-cell title="Edit Title" is-link>{{this.proprietor.title}}</van-cell>
      </van-cell-group>
      <van-cell-group inset @click='changePhoneShow=true'>
        <van-cell title="Edit Phone" is-link>{{this.proprietor.phone}}</van-cell>
      </van-cell-group>
      <van-cell-group inset @click='changeEmailShow=true'>
        <van-cell title="Edit Email" is-link>{{this.proprietor.email}}</van-cell>
      </van-cell-group>
      <van-cell-group inset @click='changeWeChatShow=true'>
        <van-cell title="Edit WeChat" is-link>{{this.proprietor.weChat}}</van-cell>
      </van-cell-group>
      <van-cell-group inset @click='changeDoorShow=true'>
        <van-cell title="Edit Door Number" is-link>{{this.proprietor.door}}</van-cell>
      </van-cell-group>
      <van-cell-group inset @click='changeBuildingShow=true'>
        <van-cell title="Edit Building Number" is-link>{{this.proprietor.building}}</van-cell>
      </van-cell-group>
      <van-cell-group inset @click='changeRoleInFamilyShow=true'>
        <van-cell title="Edit Role in Family" is-link>{{this.proprietor.roleInFamily}}</van-cell>
      </van-cell-group>
    </van-popup>

    <!-- Edit name dialog -->
    <van-dialog v-model="changeNameShow" title="Edit Name" :showConfirmButton=false>
      <van-cell-group>
        <van-form @submit="submitName">
          <van-field v-model="changeInfoBag.value" label="Name" placeholder="Enter name" />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">Confirm</van-button>
          </div>
        </van-form>
      </van-cell-group>
    </van-dialog>

    <!-- Edit title dialog -->
    <van-dialog v-model="changeTitleShow" title="Edit Title" :showConfirmButton=false>
      <van-cell-group>
        <van-form @submit="submitTitle">
          <van-field v-model="changeInfoBag.value" label="Title" placeholder="Enter title" />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">Confirm</van-button>
          </div>
        </van-form>
      </van-cell-group>
    </van-dialog>

    <!-- Edit phone dialog -->
    <van-dialog v-model="changePhoneShow" title="Edit Phone" :showConfirmButton=false>
      <van-cell-group>
        <van-form @submit="submitPhone">
          <van-field v-model="changeInfoBag.value" label="Phone" placeholder="Enter phone" />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">Confirm</van-button>
          </div>
        </van-form>
      </van-cell-group>
    </van-dialog>

    <!-- Edit email dialog -->
    <van-dialog v-model="changeEmailShow" title="Edit Email" :showConfirmButton=false>
      <van-cell-group>
        <van-form @submit="submitEmail">
          <van-field v-model="changeInfoBag.value" label="Email" placeholder="Enter email" />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">Confirm</van-button>
          </div>
        </van-form>
      </van-cell-group>
    </van-dialog>

    <!-- Edit WeChat dialog -->
    <van-dialog v-model="changeWeChatShow" title="Edit WeChat" :showConfirmButton=false>
      <van-cell-group>
        <van-form @submit="submitWeChat">
          <van-field v-model="changeInfoBag.value" label="WeChat" placeholder="Enter WeChat" />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">Confirm</van-button>
          </div>
        </van-form>
      </van-cell-group>
    </van-dialog>

    <!-- Edit door number dialog -->
    <van-dialog v-model="changeDoorShow" title="Edit Door Number" :showConfirmButton=false>
      <van-cell-group>
        <van-form @submit="submitDoor">
          <van-field v-model="changeInfoBag.value" label="Door Number" placeholder="Enter door number" />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">Confirm</van-button>
          </div>
        </van-form>
      </van-cell-group>
    </van-dialog>

    <!-- Edit building number dialog -->
    <van-dialog v-model="changeBuildingShow" title="Edit Building Number" :showConfirmButton=false>
      <van-cell-group>
        <van-form @submit="submitBuilding">
          <van-field v-model="changeInfoBag.value" label="Building Number" placeholder="Enter building number" />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">Confirm</van-button>
          </div>
        </van-form>
      </van-cell-group>
    </van-dialog>

    <!-- Edit role in family dialog -->
    <van-dialog v-model="changeRoleInFamilyShow" title="Edit Role in Family" :showConfirmButton=false>
      <van-cell-group>
        <van-form @submit="submitRoleInFamily">
          <van-field v-model="changeInfoBag.value" label="Role in Family" placeholder="Enter role in family" />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">Confirm</van-button>
          </div>
        </van-form>
      </van-cell-group>
    </van-dialog>

    <!-- Edit pet information popup -->
    <van-popup v-model="changePetInfoShow" round position="bottom" :style="{ height: '70%' }">
      <div style="height: 10vh"/>
      <van-form @submit="changePetInfoOnSubmit">
        <van-field
            v-model="changePetInfoForm.petName"
            name="Pet Name"
            label="Pet Name"
            placeholder="Enter name"
        />
        <van-field
            v-model="changePetInfoForm.age"
            name="Pet Age"
            label="Pet Age"
            placeholder="Enter age"
        />
        <van-field
            v-model="changePetInfoForm.species"
            name="Pet Species"
            label="Pet Species"
            placeholder="Enter species"
        />
        <div style="margin: 10vh;">
          <van-button round block type="info" native-type="submit">Submit</van-button>
        </div>
      </van-form>
    </van-popup>

    <div style="height:20vh"></div>
  </div>
</template>

<script>
import {changeProprietorInfo, getProprietorInfo} from "@/api/ProprietorInfo";
import {ProprietorChangePetInfo, ProprietorSearchPet} from "@/api/Pet";
import {proprietorSearchCar} from "@/api/Car";

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
      changePetInfoShow:false,
      activeName: '1',
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
      petTable:[{
        id:"",
        petName: "",
        age: '',
        createDate:"",
        species: "",
      }],
      id:'0',
      // Interface data package: account, attribute, modification value
      changeInfoBag:{
        id:'',
        attribute:'',
        value:''
      },
      changePetInfoForm:{
        id:'',
        petName:"",
        age:'',
        createDate:"",
        species:"",
      },
      newName:'',
      licensePlate:"",
      parkingSpace:""
    }
  },
  created() {
    // Load "My" page data information
    this.load();
  },
  methods:{
    logout(){
      this.$router.push('/login')
      localStorage.removeItem('isLogin');
      localStorage.removeItem('user');
    },
    load(){
      // Read user id from localstorage
      this.proprietor = JSON.parse(localStorage.getItem('user'))
      // Get the latest proprietor information
      getProprietorInfo(this.proprietor.id).then(res=>{
        this.proprietor = res
      })
      ProprietorSearchPet(this.proprietor.id).then(res=>{
        this.petTable = res
      })
      proprietorSearchCar(this.proprietor.id).then(res=>{
        for(let i = 0 ;i<res.length;i++){
          this.licensePlate = this.licensePlate + " " + res[i].licensePlate
          this.parkingSpace = this.parkingSpace + " " + res[i].parkingSpace
        }
      })
    },
    // Show edit personal information popup
    showFormUp(){
      this.editInfoShow = true;
    },
    // Submit name change
    submitName(){
      this.changeInfoBag.id = this.proprietor.id
      this.changeInfoBag.attribute = 1
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value = ''
      this.changeNameShow = false
      this.timer = setTimeout(()=>{
        this.load()
      },500);
    },
    submitTitle(){
      this.changeInfoBag.id = this.proprietor.id
      this.changeInfoBag.attribute = 2
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value = ''
      this.changeTitleShow = false
      this.timer = setTimeout(()=>{
        this.load()
      },500);
    },
    submitPhone(){
      this.changeInfoBag.id = this.proprietor.id
      this.changeInfoBag.attribute = 3
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value = ''
      this.changePhoneShow = false
      this.timer = setTimeout(()=>{
        this.load()
      },500);
    },
    submitEmail(){
      this.changeInfoBag.id = this.proprietor.id
      this.changeInfoBag.attribute = 4
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value = ''
      this.changeEmailShow = false
      this.timer = setTimeout(()=>{
        this.load()
      },500);
    },
    submitWeChat(){
      this.changeInfoBag.id = this.proprietor.id
      this.changeInfoBag.attribute = 5
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value = ''
      this.changeWeChatShow = false
      this.timer = setTimeout(()=>{
        this.load()
      },500);
    },
    submitDoor(){
      this.changeInfoBag.id = this.proprietor.id
      this.changeInfoBag.attribute = 6
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value = ''
      this.changeDoorShow = false
      this.timer = setTimeout(()=>{
        this.load()
      },500);
    },
    submitBuilding(){
      this.changeInfoBag.id = this.proprietor.id
      this.changeInfoBag.attribute = 7
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value = ''
      this.changeBuildingShow = false
      this.timer = setTimeout(()=>{
        this.load()
      },500);
    },
    submitRoleInFamily(){
      this.changeInfoBag.id = this.proprietor.id
      this.changeInfoBag.attribute = 8
      changeProprietorInfo(this.changeInfoBag).then(res=>{
        console.log(res)
      })
      this.changeInfoBag.value = ''
      this.changeRoleInFamilyShow = false
      this.timer = setTimeout(()=>{
        this.load()
      },500);
    },
    // Show edit pet information popup
    openChangePetInfoForm(data){
      this.changePetInfoForm = data
      this.changePetInfoShow = true
    },
    changePetInfoOnSubmit(){
      ProprietorChangePetInfo(this.changePetInfoForm).then(res=>{
        console.log(res)
        this.changePetInfoShow = false;
      })
    },
    toChangeCarInfo(){
      this.$router.push("/proprietorhome/proprietorchangecarinfo")
    }
  }
}
</script>

<style scoped>
.content {
  padding: 16px 16px 160px;
}
</style>
