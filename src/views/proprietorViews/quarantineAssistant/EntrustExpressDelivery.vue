<template>
  <div style="background-color: rgb(244, 244, 245); height: 100vh;">
    <van-nav-bar
        title="Express Pickup"
        left-text="Back"
        left-arrow
        @click-left="onClickLeft"
    />
    <!-- Express Pickup Application -->
    <van-form style="margin-top: 3vh" @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="name" name="name" label="Reporter"/>
        <van-field v-model="proprietorPhone" name="proprietorPhone" label="Phone"/>
        <van-field v-model="reportForm.deliveryType" name="deliveryType" label="Delivery Type"/>
        <van-field readonly clickable name="repairType" :value="reportForm.deliveryLocation" label="Storage Location" placeholder="Click to select storage location" @click="showDeliveryLocationPicker = true"/>
        <van-field v-model="reportForm.deliveryCode" name="deliveryCode" label="Pickup Code"/>
        <van-field v-model="reportForm.createDate" name="reportTime" label="Report Time"/>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">Submit</van-button>
      </div>
    </van-form>

    <!-- Select Storage Location Popup -->
    <van-popup v-model="showDeliveryLocationPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showDeliveryLocationPicker = false"/>
    </van-popup>
  </div>
</template>

<script>
import { entrustExpressDeliveryForProprietor } from "@/api/ExpressDelivery";

export default {
  name: "ExpressDelivery",
  data() {
    return {
      reportForm: {
        proprietorId: '',
        deliveryType: "",
        deliveryLocation: "",
        deliveryCode: "",
        createDate: "",
        status: ""
      },
      proprietor: [{
        id: '',
        name: '',
        title: '',
        phone: '',
        email: '',
        weChat: '',
        building: '',
        door: '',
        roleInFamily: ''
      }],
      name: "",
      timer: null,
      nowDate: '',
      nowTime: '',
      proprietorPhone: '',
      showDeliveryLocationPicker: false,
      columns: ['Fengchao Cabinet', 'Cainiao Station', 'Gatekeeper', 'Community Supermarket', 'Jinlingbao'],
    }
  },
  created() {
    // Assign default values and display
    this.proprietor = JSON.parse(localStorage.getItem('user'))
    this.reportForm.proprietorId = this.proprietor.id
    this.name = this.proprietor.name
    this.proprietorPhone = this.proprietor.phone
    this.setNowTimes()
    this.reportForm.createDate = this.nowDate + " " + this.nowTime
    this.reportForm.status = "Pending Pickup Task Assignment"
  },
  methods: {
    onClickLeft() {
      this.$router.push('/proprietorcommunity')
    },
    setNowTimes() {
      // Get the current time and store it in ReportTime
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
    onConfirm(value) {
      this.reportForm.deliveryLocation = value;
      this.showDeliveryLocationPicker = false;
    },
    onSubmit() {
      entrustExpressDeliveryForProprietor(this.reportForm).then(() => {
        this.$notify({ type: 'success', message: 'Submission Successful' });

        this.timer = setTimeout(() => {   // Set delayed execution
          this.$router.push('/proprietorcommunity')
        }, 1000);
      })
    },
  }
}
</script>

<style scoped>

</style>
