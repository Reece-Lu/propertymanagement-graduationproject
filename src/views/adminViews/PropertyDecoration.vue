<template>
  <div>


    <div style="width: 800px;float: left;margin-bottom: 10px">
      <el-input v-model="searchDTO.name" style="width: 200px" placeholder="请输入宠物主人姓名"></el-input>
      <el-input v-model="searchDTO.phone" style="width: 200px; margin-left: 20px" placeholder="请输入宠物主人电话"></el-input>
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
          stripe
      >
        <el-table-column type="selection" width="39" ></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
        <el-table-column prop="name" label="业主姓名" align="center" width="80"></el-table-column>
        <el-table-column prop="title" label="称呼" align="center" width="80"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center" width="150"></el-table-column>
        <el-table-column prop="building" label="楼号" align="center" width="150"></el-table-column>
        <el-table-column prop="door" label="门牌号" align="center" width="150"></el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="props">
            <el-button @click="crewDetailHandleClick(props.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>

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


    <el-dialog title="详细信息" :visible.sync="showDetails">
      <el-descriptions class="margin-top" :column="3" size="mini" border style="width:90%;margin-left: 30px">
        <el-descriptions-item label="开始时间"> {{this.times.startTime}}</el-descriptions-item>
        <el-descriptions-item label="结束时间">{{this.times.endTime}}</el-descriptions-item>
      </el-descriptions>
      <div>装修队信息</div>
      <el-table
          :data="this.CrewDetail"
          style="width:700px; margin-left: calc( 50% - 350px);"
          size="mini"
          border
      >
        <el-table-column
            prop="id"
            label="序号"
            width="100px">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="300px">
        </el-table-column>
        <el-table-column
            prop="tel"
            label="电话"
            width="300px">
        </el-table-column>
      </el-table>
    </el-dialog>


  </div>
</template>

<script>
import {propertySearchDecoration} from "@/api/Decoration";

export default {
  name: "PropertyDecoration",
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
        title:"",
        building: "",
        door: "",
        startTime: "",
        endTime: '',
        constructionCrew: "",
        constructionCrewJason:[]
      }],
      total:0,
      CrewDetail:[],
      times:{
        startTime:'',
        endTime:''
      },
      showDetails:false
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      propertySearchDecoration(this.searchDTO).then(res=>{
        console.log(res)
        this.tableData=res.tableData
        this.total=res.total

        for(const i in this.tableData){
          this.tableData[i].constructionCrewJason=JSON.parse(this.tableData[i].constructionCrew)
        }

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
    crewDetailHandleClick(data){
      this.times.startTime=data.startTime
      this.times.endTime=data.endTime
      this.CrewDetail=data.constructionCrewJason
      this.showDetails = true
    }
  }
}
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
