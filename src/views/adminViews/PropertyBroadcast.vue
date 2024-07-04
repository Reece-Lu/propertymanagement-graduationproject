<template>
  <div>
    <el-container
        style="width: 40%;
        height:calc(100vh - 120px);
        float:left;
        padding:40px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 30px;
        background: white"
    >
      <!-- Left Form -->
      <el-form ref="form" :model="createForm" label-width="80px" style="width:80%;margin-left: 10%; margin-top: 10%">
        <p>Publish New Notice</p>
        <el-form-item label="Event Name">
          <el-input v-model="createForm.issueName"></el-input>
        </el-form-item>
        <el-form-item label="Creation Date">
          <el-input v-model="createForm.createDate"></el-input>
        </el-form-item>
        <el-form-item label="Content">
          <el-input type="textarea" v-model="createForm.content"></el-input>
        </el-form-item>

        <el-form-item label="Importance Level">
          <el-radio-group v-model="createForm.importanceLevel">
            <el-radio label="Highly Urgent"></el-radio>
            <el-radio label="Urgent"></el-radio>
            <el-radio label="Normal"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Publish Now</el-button>
        </el-form-item>
      </el-form>
    </el-container>

    <!-- Right Preview -->
    <el-container style="width: 50%;
        height:calc(100vh - 120px);
        float:left;
        padding:40px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 30px;
        background: whitesmoke;
        margin-left: 30px;
        overflow: auto"
    >
      <van-list style="width:100%;">
        <van-cell-group inset v-for="data in broadcastTable" :key="data.id" style="margin-bottom: 1vh; padding: 20px">
          <van-field label="ID" v-model="data.id" readonly rows="1" autosize type="textarea"></van-field>
          <van-field v-model="data.issueName" readonly rows="1" autosize type="textarea"></van-field>
          <van-field label="Publication Date" v-model="data.createDate" readonly rows="1" autosize type="textarea"></van-field>
          <van-field label="Content" v-model="data.content" readonly rows="1" autosize type="textarea"></van-field>
          <van-field label="Importance Level" v-model="data.importanceLevel" readonly rows="1" autosize type="textarea"></van-field>
          <van-button type="danger" plain style="width:80%" @click="makeDeleteConfirmVisible(data.id)">Delete</van-button>
        </van-cell-group>
      </van-list>
    </el-container>

    <van-popup v-model="deleteConfirmVisible" style="width:400px; height: 200px" round>
      <div style="padding: 5vh">
        <van-cell>Confirm deletion?</van-cell>
        <van-button plain type="primary" style="margin-right: 2vh" @click="deleteBroadcast()">Confirm</van-button>
        <van-button plain type="info" @click="deleteConfirmVisible=false">Cancel</van-button>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { generalSearchBroadcast, propertyCreateBroadcast, propertyDeleteBroadcast } from "@/api/Broadcast";

export default {
  name: "PropertyBroadcast",
  data() {
    return {
      createForm: {
        createManagerId: '',
        importanceLevel: "",
        issueName: "",
        content: "",
        isDeleted: 0,
        createDate: "",
      },
      timer: null,
      nowDate: '',
      nowTime: '',
      broadcastTable: [{
        id: '',
        createManagerId: '',
        importanceLevel: '',
        issueName: '',
        content: '',
        createDate: '',
      }],
      deleteConfirmVisible: false,
      deleteId: ''
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.property = JSON.parse(localStorage.getItem('user'))
      this.createForm.createManagerId = this.property.id
      this.setNowTimes()
      this.createForm.createDate = this.nowDate + " " + this.nowTime
      generalSearchBroadcast().then(res => {
        this.broadcastTable.length = 0;
        this.broadcastTable = res
        console.log(this.broadcastTable)
      })
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
    onSubmit() {
      console.log(this.createForm)
      propertyCreateBroadcast(this.createForm).then(() => {
        this.$message({message: 'Published successfully', type: 'success'});
        this.load()
      })
    },
    deleteBroadcast() {
      propertyDeleteBroadcast(this.deleteId).then(() => {
        const h = this.$createElement;
        this.$notify({
          title: 'Success',
          message: h('i', {style: 'color: teal'}, 'Deleted')
        });
        this.load()
        this.deleteConfirmVisible = false;
      })
    },
    makeDeleteConfirmVisible(id) {
      this.deleteConfirmVisible = true
      this.deleteId = id
    }
  }
}
</script>

<style scoped>

</style>
