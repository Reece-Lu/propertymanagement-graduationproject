<template>
  <div>
    <!--Search Box-->
    <div style="width: 800px; float: left; margin-bottom: 10px">
      <el-input v-model="searchDTO.name" style="width: 200px" placeholder="Please enter the pet owner's name"></el-input>
      <el-input v-model="searchDTO.phone" style="width: 200px; margin-left: 20px" placeholder="Please enter the pet owner's phone"></el-input>
      <el-button type="primary" style="width: 100px; margin-left: 50px" @click="load">Search</el-button>
    </div>
    <!--Main Display Table-->
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
        <el-table-column type="selection" width="39"></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
        <el-table-column prop="name" label="Owner Name" align="center" width="100"></el-table-column>
        <el-table-column prop="title" label="Title" align="center" width="80"></el-table-column>
        <el-table-column prop="phone" label="Phone" align="center" width="150"></el-table-column>
        <el-table-column prop="petName" label="Pet Name" align="center" width="100"></el-table-column>
        <el-table-column prop="age" label="Age" align="center" width="80"></el-table-column>
        <el-table-column prop="species" label="Species" align="center" width="100"></el-table-column>
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
import { PropertySearchPet } from "@/api/Pet";

export default {
  name: "PropertySearchPet",
  data() {
    return {
      searchDTO: {
        name: "",
        phone: "",
        pageNum: 1,
        pageSize: 13
      },
      tableData: [{
        id: '',
        name: "",
        title: "",
        phone: "",
        petName: "",
        age: '',
        createDate: "",
        species: ""
      }],
      total: 0,
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      PropertySearchPet(this.searchDTO).then(res => {
        console.log(res)
        this.tableData = res.tableData
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
