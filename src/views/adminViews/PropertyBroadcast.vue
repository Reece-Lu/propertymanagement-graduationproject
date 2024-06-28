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
<!--左侧表单-->
      <el-form ref="form" :model="createForm" label-width="80px" style="width:80%;margin-left: 10%; margin-top: 10%">
        <p>发布新通知</p>
        <el-form-item label="事件名称">
          <el-input v-model="createForm.issueName"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="createForm.createDate"></el-input>
        </el-form-item>
        <el-form-item label="通知内容">
          <el-input type="textarea" v-model="createForm.content"></el-input>
        </el-form-item>

        <el-form-item label="事件等级">
          <el-radio-group v-model="createForm.importanceLevel">
            <el-radio label="特别紧急"></el-radio>
            <el-radio label="紧急"></el-radio>
            <el-radio label="普通"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即发布</el-button>
        </el-form-item>
      </el-form>
    </el-container>

    <el-container style="width: 50%;float:left">

    </el-container>



  </div>
</template>

<script>
import {propertyCreateBroadcast} from "@/api/Broadcast";

export default {
  name: "PropertyBroadcast",
  data(){
    return{
      createForm:{
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
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      this.property=JSON.parse(localStorage.getItem('user'))
      this.createForm.createManagerId=this.property.id
      this.setNowTimes()
      this.createForm.createDate=this.nowDate+" "+this.nowTime
    },
    setNowTimes () {
      //获取当前时间，存入ReportTime
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
    onSubmit(){
      console.log(this.createForm)
      propertyCreateBroadcast(this.createForm).then(()=>{
        this.$message({message: '发布成功', type: 'success'});
        this.load()
      })
    }
  }

}
</script>

<style scoped>

</style>
