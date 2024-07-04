<template>
  <div style="background-color: rgb(244, 244, 245); height: 100vh;">

    <van-nav-bar
        title="Repair Request"
        left-text="Back"
        left-arrow
        @click-left="onClickLeft"
    />
    <!-- New Repair Form -->
    <van-form style="margin-top: 3vh" @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="reportForm.reporter" name="reporter" label="Reporter"/>
        <van-field v-model="reportForm.reporterPhone" name="reporterPhone" label="Phone"/>
        <van-field v-model="reportForm.reportTime" name="reportTime" label="Report Time"/>
        <van-field readonly clickable name="repairType" :value="reportForm.repairType" label="Repair Type" placeholder="Click to select repair type" @click="showRepairTypePicker = true"/>
        <van-field v-model="reportForm.repairLocation" rows="1" autosize name="repairLocation" label="Repair Location" type="textarea" placeholder="Enter repair location"/>
        <van-field v-model="reportForm.repairDescription" rows="2" autosize name="repairDescription" label="Repair Description" type="textarea" maxlength="100" placeholder="Enter repair description" show-word-limit/>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">Submit</van-button>
      </div>
    </van-form>

    <!-- Repair Type Picker Popup -->
    <van-popup v-model="showRepairTypePicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showRepairTypePicker = false"/>
    </van-popup>

  </div>
</template>

<script>
import { createReport } from "@/api/ReportAndRepair";

export default {
  name: "CreateFixingReport",
  data() {
    return {
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
      reportForm: {
        reporter: '',
        reporterId: '',
        reporterPhone: '',
        reportTime: '',
        repairType: '',
        repairLocation: '',
        repairDescription: '',
        repairStatus: 'Pending Assignment'
      },
      timer: null,
      nowWeek: '',
      nowDate: '',
      nowTime: '',
      showRepairTypePicker: false,
      columns: ['Water', 'Electricity', 'Heating', 'Gas', 'Public Facilities', 'Environment', 'Others'],
    }
  },
  created() {
    // Set default values and display
    this.proprietor = JSON.parse(localStorage.getItem('user'))
    console.log("localStorage:" + this.proprietor)
    this.reportForm.reporter = this.proprietor.name
    this.reportForm.reporterPhone = this.proprietor.phone
    this.reportForm.reporterId = this.proprietor.id
    this.setNowTimes()
    this.reportForm.reportTime = this.nowDate + " " + this.nowTime
  },
  methods: {
    onClickLeft() {
      // Return to main branch page
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
    // Repair type picker close button
    onConfirm(value) {
      this.reportForm.repairType = value;
      this.showRepairTypePicker = false;
    },
    // Submit form
    onSubmit() {
      createReport(this.reportForm).then(() => {
        this.$notify({ type: 'success', message: 'Submission Successful' });
        this.timer = setTimeout(() => {   // Set delayed execution
          this.$router.push('/proprietorcommunity')
        }, 500);
      })
    },
  }
}
</script>

<style scoped>
body {

}
</style>
