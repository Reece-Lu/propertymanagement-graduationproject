<template>
  <div style="background-color: rgb(244, 244, 245); height: 100vh;">
    <van-nav-bar
        title="Decoration Registration"
        left-text="Back"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-cell-group inset title="Enter Decoration Information">
      <van-cell title="Owner Name" :value="this.proprietorName" />
      <van-cell title="Select Decoration Date Range" is-link @click="choseDateShow = true" />
      <van-cell title="Building Number" :value="this.decorationFormData.building" />
      <van-cell title="Door Number" :value="this.decorationFormData.door" />
      <van-cell title="Enter Decoration Crew Information" is-link @click="crewPopUpShow = true" />
    </van-cell-group>

    <!-- Decoration Date Picker -->
    <van-calendar
        v-model="choseDateShow"
        type="range"
        @confirm="onConfirm"
        :min-date="minDate"
        :max-date="maxDate"
        color="#1989fa"
    />

    <!-- Decoration Crew Entry -->
    <van-popup v-model="crewPopUpShow" round position="bottom" :style="{ height: '80%' }" closeable>
      <div style="height: 10%" />
      <van-cell-group v-for="data in constructionCrewJason" :key="data.id" inset>
        <van-cell center size="large">
          <van-row>
            <van-col span="8">Name:</van-col>
            <van-col span="16">{{data.name}}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">Phone:</van-col>
            <van-col span="16">{{data.tel}}</van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
      <van-button round type="info" style="width: 30vh; height:5vh; margin-left: calc(50% - 15vh); margin-top: 10vh" @click="addCrewPopUpShow=true">Add Crew Member</van-button>
      <van-button round type="info" style="width: 30vh; height:5vh; margin-left: calc(50% - 15vh); margin-top: 1vh" @click="submitCrewList">Save</van-button>
    </van-popup>

    <!-- Add Decoration Crew -->
    <van-popup v-model="addCrewPopUpShow" round position="bottom" :style="{ height: '70%' }" closeable>
      <div style="height: 10%" />
      <van-form @submit="addCrewOnSubmit">
        <van-field
            v-model="addConstructionCrewJason.name"
            name="Name"
            placeholder="Enter Name"
        />
        <van-field
            v-model="addConstructionCrewJason.tel"
            name="Phone"
            placeholder="Enter Phone"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">Submit</van-button>
        </div>
      </van-form>
    </van-popup>

    <van-button round type="info" style="width: 30vh; height:5vh; margin-left: calc(50% - 15vh); margin-top: 20vh" @click="submitRegisterInfo">Submit</van-button>
  </div>
</template>

<script>
import { proprietorRegisterDecoration } from "@/api/Decoration";

export default {
  name: "ProprietorRegisterDecoration",
  data() {
    return {
      decorationFormData: {
        proprietorId: '',
        startTime: '',
        endTime: '',
        building: '',
        door: '',
        constructionCrew: ''
      },
      constructionCrewJason: [],
      addConstructionCrewJason: {
        id: '',
        name: '',
        tel: '',
      },
      proprietorName: '',
      choseDateShow: false,
      crewPopUpShow: false,
      addCrewPopUpShow: false,
      timer: null,
      crewNum: 1,
      data: '',
      minDate: new Date(2022, 0, 1),
      maxDate: new Date(2042, 0, 31),
    }
  },
  created() {
    this.proprietor = JSON.parse(localStorage.getItem('user'))
    this.decorationFormData.proprietorId = this.proprietor.id
    this.proprietorName = this.proprietor.name
    this.decorationFormData.building = this.proprietor.building
    this.decorationFormData.door = this.proprietor.door
  },
  methods: {
    onClickLeft() {
      this.$router.push('/proprietorcommunity')
    },
    formatDate(date) {
      return `${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`;
    },
    // Date Picker
    onConfirm(date) {
      const [start, end] = date;
      this.choseDateShow = false;
      this.decorationFormData.startTime = `${this.formatDate(start)}`;
      this.decorationFormData.endTime = `${this.formatDate(end)}`;
    },
    // Submit from second layer popup
    addCrewOnSubmit() {
      this.addCrewPopUpShow = false
      this.addConstructionCrewJason.id = this.crewNum
      this.crewNum = this.crewNum + 1
      this.constructionCrewJason.push(this.addConstructionCrewJason)
      const a = JSON.stringify(this.constructionCrewJason);
      this.constructionCrewJason = JSON.parse(a);
      console.log(this.constructionCrewJason)
      this.addConstructionCrewJason.id = ''
      this.addConstructionCrewJason.name = ''
      this.addConstructionCrewJason.tel = ''
    },
    // Submit from first layer popup
    submitCrewList() {
      this.crewPopUpShow = false
      this.decorationFormData.constructionCrew = JSON.stringify(this.constructionCrewJason)
      console.log(this.decorationFormData.constructionCrew)
    },
    // Final submit
    submitRegisterInfo() {
      proprietorRegisterDecoration(this.decorationFormData).then(res => {
        console.log(res)
        this.timer = setTimeout(() => {   // Delay execution
          this.$router.push('/proprietorcommunity')
        }, 1000);
      })
    }
  }
}
</script>

<style scoped>

</style>
