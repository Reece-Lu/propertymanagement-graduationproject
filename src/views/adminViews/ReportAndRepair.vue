<template>
<div class="reportandrepair" style="line-height: 30px">
    <div style="width: 800px;float: left;margin-bottom: 30px">
      <el-input v-model="repairCase.reporter" style="width: 200px" placeholder="请输入报修人姓名"></el-input>
      <el-input v-model="repairCase.repairType" style="width: 200px;margin-left: 50px" placeholder="请输入维修类型"></el-input>
      <el-button type="primary" style="width: 100px;margin-left: 50px" @click="load">搜索</el-button>
    </div>

    <div id="reportRepairTable">
      <el-table
          :data="tableData"
          border
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%;"
          size="mini"
      >
        <el-table-column type="selection" width="39" ></el-table-column>
        <el-table-column  fixed prop="id" label="ID" align="center" width="40"></el-table-column>
        <el-table-column  fixed prop="reporter" label="报修人" align="center" width="100"></el-table-column>
        <el-table-column prop="reporterPhone" label="报修人电话" align="center" width="100"></el-table-column>
        <el-table-column prop="reportTime" label="报修时间" align="center" width="150"></el-table-column>
        <el-table-column prop="repairType" label="报修类型" align="center" width="70"></el-table-column>
        <el-table-column prop="repairLocation" label="地点" align="center" width="200"></el-table-column>
        <el-table-column prop="repairDescription" label="描述" align="center" width="300"></el-table-column>
        <el-table-column  fixed="right" prop="serviceman" label="维修人" align="center" width="100"></el-table-column>
        <el-table-column  fixed="right" prop="repairStatus" label="维修状态" align="center" width="120"></el-table-column>
        <!--      <el-table-column label="操作">-->
        <!--        <template >-->
        <!--          <el-button-->
        <!--              size="mini"-->
        <!--              >修改-->
        <!--          </el-button>-->
        <!--          <el-button-->
        <!--              size="mini"-->
        <!--              type="danger"-->
        <!--             >删除-->
        <!--          </el-button>-->
        <!--        </template>-->
        <!--      </el-table-column>-->
      </el-table>
    </div>

<!--    <div style="text-align: center;margin-top: 30px;">-->

<!--      <el-pagination-->
<!--          background-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :current-page ="pageNum"-->
<!--          :page-sizes="[2,5,15,20]"-->
<!--          :page-size="pageSize"-->
<!--          layout="total, sizes, prev, pager, next, jumper"-->
<!--          :total="total"-->
<!--      >-->
<!--      </el-pagination>-->

<!--    </div>-->


</div>
</template>

<script>
//import request from "@/utils/request";

import {reportRepairSearch} from "@/api/ReportAndRepair";

export default {
  name: "ReportAndRepair",
  data(){
    return{
      tableData:[{
        id:'',
        reporter:'',
        reporterPhone:'',
        reportTime:'',
        repairType:'',
        repairLocation:'',
        repairDescription:'',
        serviceman:'',
        repairStatus:''
      }],
      // total:0,
      repairCase:{
        reporter:'',
        repairType:''
      },
      // pageNum:1,
      // pageSize:5,
    }
  },
  created() {
    //请求分页查询数据
    this.load()
  },
  methods:{
    // handleSizeChange(pageSize){
    //   console.log(pageSize)
    //   this.pageSize=pageSize
    //   this.load()
    // },
    // handleCurrentChange(pageNum){
    //   console.log(pageNum)
    //   this.pageNum=pageNum
    //   this.load()
    // },
    load(){
      reportRepairSearch(this.repairCase).then(res=>{
        // console.log(res)
        console.log(res)
        this.tableData=res
      })
    }
  }
}
</script>

<style scoped>

</style>
