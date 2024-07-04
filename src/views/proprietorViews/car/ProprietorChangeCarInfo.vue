<template>
  <div style="background-color: rgb(244, 244, 245); height: 100vh;">

    <van-nav-bar
        title="Car Information Modification"
        left-text="Back"
        left-arrow
        @click-left="onClickLeft"
    />
    <!-- Owner Car Display -->
    <van-cell-group title="My Cars" style="background: rgb(244, 244, 245)">
      <van-cell-group inset v-for="data in carListData" :key="data.id" style="margin-top:1vh">
        <van-cell center size="large">
          <van-row>
            <van-col span="12">License Plate:</van-col>
            <van-col span="12">{{data.licensePlate}}</van-col>
          </van-row>
          <van-row>
            <van-col span="12">Parking Space:</van-col>
            <van-col span="12">{{data.parkingSpace}}</van-col>
          </van-row>
          <van-row>
            <van-col span="12">Color:</van-col>
            <van-col span="12">{{data.colour}}</van-col>
          </van-row>

          <van-button plain hairline type="info" size="mini" style="width: 10vh; margin-left: calc(50% - 5vh); padding:1vh" @click="changeDataFromShow(data)">Modify</van-button>
        </van-cell>
      </van-cell-group>
    </van-cell-group>

    <van-popup v-model="changeCarInfoFormShow" round position="bottom" closeable :style="{ height: '60%' }">
      <div style="height:10%"/>
      <van-field
          v-model="changeFormData.licensePlate"
          name="licensePlate"
          label="License Plate:"
      />
      <van-field
          v-model="changeFormData.parkingSpace"
          name="parkingSpace"
          label="Parking Space:"
      />
      <van-field
          v-model="changeFormData.colour"
          name="colour"
          label="Color:"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @click="submitChangedInfo">Submit</van-button>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { proprietorChangeCarInfo, proprietorSearchCar } from "@/api/Car";
import { Notify } from "vant";

export default {
  name: "ProprietorChangeCarInfo",
  data() {
    return {
      carListData: [{
        id: "",
        licensePlate: "",
        parkingSpace: "",
        colour: ""
      }],
      changeFormData: {
        id: "",
        licensePlate: "",
        parkingSpace: "",
        colour: ""
      },
      changeCarInfoFormShow: false,
    }
  },
  created() {
    this.load()
  },
  methods: {
    onClickLeft() {
      this.$router.push('/proprietormine')
    },
    load() {
      this.proprietor = JSON.parse(localStorage.getItem('user'))
      proprietorSearchCar(this.proprietor.id).then(res => {
        this.carListData = res
      })
    },
    changeDataFromShow(data) {
      this.changeFormData = data
      this.changeCarInfoFormShow = true
    },
    submitChangedInfo() {
      proprietorChangeCarInfo(this.changeFormData).then(() => {
        Notify({ type: 'success', message: 'Modification Successful' });
        this.changeCarInfoFormShow = false
      })
    }
  }
}
</script>

<style scoped>

</style>
