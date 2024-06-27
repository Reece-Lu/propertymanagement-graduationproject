<template>
  <div>
    <div style="width: 800px; float: left; margin-bottom: 10px">
      <el-input v-model="searchDTO.name" style="width: 200px" placeholder="Please enter the pet owner's name"></el-input>
      <el-input v-model="searchDTO.phone" style="width: 200px; margin-left: 20px" placeholder="Please enter the pet owner's phone"></el-input>
      <el-button type="primary" style="width: 100px; margin-left: 50px" @click="load">Search</el-button>
    </div>

    <div id="reportRepairTable">
      <el-table
          :data="tableData"
          border
          height="70vh"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          size="mini"
          stripe
      >
        <el-table-column type="selection" width="39"></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
        <el-table-column prop="name" label="Owner Name" align="center" width="80"></el-table-column>
        <el-table-column prop="title" label="Title" align="center" width="80"></el-table-column>
        <el-table-column prop="phone" label="Phone" align="center" width="150"></el-table-column>
        <el-table-column prop="building" label="Building Number" align="center" width="150"></el-table-column>
        <el-table-column prop="door" label="Door Number" align="center" width="150"></el-table-column>
        <el-table-column align="center" label="Action" width="100">
          <template slot-scope="props">
            <el-button @click="crewDetailHandleClick(props.row)" type="text" size="small">View</el-button>
          </template>
        </el-table-column>
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
      ></el-pagination>
    </div>

    <el-dialog title="Details" :visible.sync="showDetails">
      <el-descriptions class="margin-top" :column="3" size="mini" border style="width: 90%; margin-left: 30px">
        <el-descriptions-item label="Start Time">{{ times.startTime }}</el-descriptions-item>
        <el-descriptions-item label="End Time">{{ times.endTime }}</el-descriptions-item>
      </el-descriptions>
      <div>Construction Crew Information</div>
      <el-table
          :data="CrewDetail"
          style="width: 700px; margin-left: calc(50% - 350px);"
          size="mini"
          border
      >
        <el-table-column prop="id" label="ID" width="100px"></el-table-column>
        <el-table-column prop="name" label="Name" width="300px"></el-table-column>
        <el-table-column prop="tel" label="Phone" width="300px"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { propertySearchDecoration } from "@/api/Decoration";

export default {
  name: "PropertyDecoration",
  data() {
    return {
      searchDTO: {
        name: "",
        phone: "",
        pageNum: 1,
        pageSize: 13,
      },
      tableData: [],
      total: 0,
      CrewDetail: [],
      times: {
        startTime: "",
        endTime: "",
      },
      showDetails: false,
    };
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      try {
        const res = await propertySearchDecoration(this.searchDTO);
        this.tableData = res.tableData || [];
        this.total = res.total || 0;
        this.tableData.forEach((item) => {
          item.constructionCrewJason = JSON.parse(item.constructionCrew || "[]");
        });
      } catch (error) {
        console.error("Failed to load data:", error);
        this.tableData = [];
        this.total = 0;
      }
    },
    handleSizeChange(pageSize) {
      this.searchDTO.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      this.searchDTO.pageNum = pageNum;
      this.load();
    },
    crewDetailHandleClick(data) {
      this.times.startTime = data.startTime;
      this.times.endTime = data.endTime;
      this.CrewDetail = data.constructionCrewJason;
      this.showDetails = true;
    },
  },
};
</script>

<style scoped>
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
