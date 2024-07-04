<template>
  <div style="background-color: rgb(244, 244, 245); height: 100vh;">
    <van-nav-bar
        title="Repair Records"
        left-text="Back"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-list>
      <van-cell style="background-color: rgb(244, 244, 245);" v-for="data in fixingReportList" :key="data.id">
        <van-cell-group inset>
          <van-cell center clickable size="large">
            <van-row>
              <van-col span="10">Reporter:</van-col>
              <van-col span="14">{{data.reporter}}</van-col>
            </van-row>
            <van-row>
              <van-col span="10">Repair Status:</van-col>
              <van-col span="14"><van-tag round type="success">{{data.repairStatus}}</van-tag></van-col>
            </van-row>
            <van-row>
              <van-col span="10">Report Time:</van-col>
              <van-col span="14">{{data.reportTime}}</van-col>
            </van-row>
            <van-row>
              <van-col span="10">Repair Location:</van-col>
              <van-col span="14">{{data.repairLocation}}</van-col>
            </van-row>
            <van-row>
              <van-col span="10">Serviceman:</van-col>
              <van-col span="14"><van-tag plain type="primary">{{data.serviceman}}</van-tag></van-col>
            </van-row>
            <van-row>
              <van-col span="10">Repair Description:</van-col>
              <van-col span="14">{{data.repairDescription}}</van-col>
            </van-row>
          </van-cell>
        </van-cell-group>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { checkFixingReportList } from "@/api/ReportAndRepair";

export default {
  name: "CheckFixingReport",
  data() {
    return {
      row: '',
      reporterId: '',
      fixingReportList: [{}],
      proprietor: [{}],
    }
  },
  created() {
    this.proprietor = JSON.parse(localStorage.getItem('user'));
    this.reporterId = this.proprietor.id;
    checkFixingReportList(this.reporterId).then(res => {
      this.fixingReportList = res;
      console.log(this.fixingReportList);
    });
  },
  methods: {
    onClickLeft() {
      this.$router.push('/proprietorcommunity');
    },
    showDetails(row) {
      console.log(row);
    }
  }
}
</script>

<style scoped>
</style>
