<template>
  <div>
    <!--Search Box-->
    <div style="width: 800px; float: left; margin-bottom: 10px">
      <el-input v-model="searchDTO.name" style="width: 200px" placeholder="Please enter the owner's name"></el-input>
      <el-button type="primary" style="width: 100px; margin-left: 50px" @click="load">Search</el-button>
    </div>
    <!--Main Display Table-->
    <div id="reportRepairTable">
      <el-table
          :data="proprietorTableData"
          border
          height="70vh"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%;"
          size="mini"
      >
        <el-table-column type="selection" width="39"></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
        <el-table-column prop="userName" label="Owner Username" align="center" width="100"></el-table-column>
        <el-table-column prop="name" label="Owner Name" align="center" width="80"></el-table-column>
        <el-table-column prop="title" label="Title" align="center" width="80"></el-table-column>
        <el-table-column prop="phone" label="Phone" align="center" width="150"></el-table-column>
        <el-table-column prop="email" label="Email" align="center" width="150"></el-table-column>
        <el-table-column prop="weChat" label="WeChat" align="center" width="150"></el-table-column>
        <el-table-column prop="building" label="Building Number" align="center" width="150"></el-table-column>
        <el-table-column prop="door" label="Door Number" align="center" width="100"></el-table-column>
        <el-table-column prop="roleInFamily" label="Family Role" align="center" width="100"></el-table-column>
      </el-table>
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchDTO.pageNum"
          :page-sizes="[5, 13, 20, 50]"
          :page-size="searchDTO.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { propertysearchproprietorinfo } from "@/api/ProprietorInfo";

export default {
  name: "ProprietorArchives",
  data() {
    return {
      searchDTO: {
        name: "",
        pageNum: 1,
        pageSize: 13,
      },
      proprietorTableData: [{
        id: '',
        userName: "",
        password: "",
        name: "",
        title: "",
        phone: "",
        email: "",
        weChat: "",
        building: "",
        door: "",
        roleInFamily: ""
      }],
      total: 0
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      propertysearchproprietorinfo(this.searchDTO).then(res => {
        console.log(res)
        this.proprietorTableData = res.tableData
        this.total = res.total
      })
    },
    // Select the number of items displayed per page in the pagination table, and reload after setting
    handleSizeChange(pageSize) {
      this.searchDTO.pageSize = pageSize
      this.load()
    },
    // Select the page number to display in the pagination table, and reload after setting
    handleCurrentChange(pageNum) {
      this.searchDTO.pageNum = pageNum
      this.load()
    },
  }
}
</script>

<style scoped>

</style>
