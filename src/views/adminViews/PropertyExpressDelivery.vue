<template>
<div>

  <div style="width: 800px;float: left;margin-bottom: 10px">
    <el-input v-model="searchForm.name" style="width: 200px" placeholder="请输入委托取件姓名"></el-input>
    <el-input v-model="searchForm.phone" style="width: 200px;margin-left: 50px" placeholder="请输入委托取件电话"></el-input>
    <el-button type="primary" style="width: 100px;margin-left: 50px" @click="load">搜索</el-button>
  </div>

  <div id="reportRepairTable">
    <el-table
        :data="tableData"
        border
        height="70vh"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%;"
        size="mini"
    >
      <el-table-column type="selection" width="39" ></el-table-column>
      <el-table-column prop="id" label="ID" align="center" width="40"></el-table-column>
      <el-table-column prop="name" label="委托人" align="center" width="100"></el-table-column>
      <el-table-column prop="title" label="称呼" align="center" width="80"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center" width="150"></el-table-column>
      <el-table-column prop="deliveryCode" label="取件码" align="center" width="100"></el-table-column>
      <el-table-column prop="deliveryType" label="包裹种类" align="center" width="150"></el-table-column>
      <el-table-column prop="deliveryLocation" label="包裹位置" align="center" width="150"></el-table-column>
      <el-table-column prop="serviceman" label="领取人" align="center" width="100"></el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope" >
          <el-button
              size="mini"
              @click="handleClick(scope.row)"
          >分配领取人
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div style="text-align: center;margin-top: 30px;">
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page ="searchForm.pageNum"
        :page-sizes="[5,13,20,50]"
        :page-size="searchForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
    >
    </el-pagination>
  </div>

</div>
</template>

<script>
import {getExpressDeliveryInfoForProperty} from "@/api/ExpressDelivery";

export default {
  name: "PropertyExpressDelivery",
  data(){
    return{
      total:'',
      tableData:[{
        id:'',
        name:"",
        title:"",
        phone:"",
        deliveryCode:"",
        deliveryType:"",
        deliveryLocation:"",
        serviceman:""
      }],
      searchForm:{
        name:"",
        phone:"",
        pageNum: 1,
        pageSize: 10,
      }
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      getExpressDeliveryInfoForProperty(this.searchForm).then(res=>{
        this.tableData=res.tableData
        this.total=res.total
      })
    },
    //选择分页查询表每页展示的数据条数，设置完成后由load重新请求
    handleSizeChange(pageSize){
      console.log(pageSize)
      this.searchForm.pageSize=pageSize
      this.load()
    },
    //选择分页查询表的展示页码，设置完成后由load重新请求
    handleCurrentChange(pageNum){
      console.log(pageNum)
      this.searchForm.pageNum=pageNum
      this.load()
    },
  }
}
</script>

<style scoped>

</style>
