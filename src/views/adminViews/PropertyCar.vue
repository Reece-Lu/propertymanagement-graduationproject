<template>
  <div>


  <!--搜索框-->
  <div style="width: 800px;float: left;margin-bottom: 10px">
    <el-input v-model="searchDTO.name" style="width: 200px" placeholder="请输入宠物主人姓名"></el-input>
    <el-input v-model="searchDTO.phone" style="width: 200px; margin-left: 20px" placeholder="请输入宠物主人电话"></el-input>
    <el-button type="primary" style="width: 100px;margin-left: 50px" @click="load">搜索</el-button>
  </div>
  <!--主显示表-->
  <div id="reportRepairTable">
    <el-table
        :data="tableData"
        border
        height="70vh"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 80%;"
        size="mini"
    >
      <el-table-column type="selection" width="39" ></el-table-column>
      <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
      <el-table-column prop="name" label="业主姓名" align="center" width="80"></el-table-column>
      <el-table-column prop="title" label="称呼" align="center" width="80"></el-table-column>
      <el-table-column prop="phone" label="电话" align="center" width="150"></el-table-column>
      <el-table-column prop="licensePlate" label="车牌号" align="center" width="150"></el-table-column>
      <el-table-column prop="parkingSpace" label="车位" align="center" width="150"></el-table-column>
      <el-table-column prop="colour" label="颜色" align="center" width="100"></el-table-column>
    </el-table>
  </div>

  <div style="text-align: center;margin-top: 30px;">
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page ="searchDTO.pageNum"
        :page-sizes="[5,13,20,50]"
        :page-size="searchDTO.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
    >
    </el-pagination>
  </div>
  </div>
</template>

<script>
import {propertySearchCar} from "@/api/Car";

export default {
  name: "PropertyCar",
  data(){
    return{
      searchDTO:{
        name:"",
        phone:"",
        pageNum: 1,
        pageSize: 13
      },
      tableData:[{
        id: '',
        name: "",
        title: "",
        phone: "",
        licensePlate: "",
        parkingSpace: '',
        colour: "",
      }],
      total:0,
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      propertySearchCar(this.searchDTO).then(res=>{
        console.log(res)
        this.tableData=res.tableData
        this.total=res.total
      })
    },
    //选择分页查询表每页展示的数据条数，设置完成后由load重新请求
    handleSizeChange(pageSize){
      this.searchDTO.pageSize=pageSize
      this.load()
    },
    //选择分页查询表的展示页码，设置完成后由load重新请求
    handleCurrentChange(pageNum){
      this.searchDTO.pageNum=pageNum
      this.load()
    },
  }
}
</script>

<style scoped>

</style>
