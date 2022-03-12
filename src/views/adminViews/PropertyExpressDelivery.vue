<template>
<div>
<!--搜索框-->
  <div style="width: 800px;float: left;margin-bottom: 10px">
    <el-input v-model="searchForm.name" style="width: 200px" placeholder="请输入委托取件姓名"></el-input>
    <el-input v-model="searchForm.phone" style="width: 200px;margin-left: 50px" placeholder="请输入委托取件电话"></el-input>
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
        style="width: 100%;"
        size="mini"
    >
      <el-table-column type="selection" width="39" ></el-table-column>
      <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
      <el-table-column prop="name" label="委托人" align="center" width="100"></el-table-column>
      <el-table-column prop="title" label="称呼" align="center" width="80"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center" width="150"></el-table-column>
      <el-table-column prop="deliveryCode" label="取件码" align="center" width="100"></el-table-column>
      <el-table-column prop="deliveryType" label="包裹种类" align="center" width="150"></el-table-column>
      <el-table-column prop="deliveryLocation" label="包裹位置" align="center" width="120"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" width="150"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="130">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.status === '已送达' ? 'success' : scope.row.status ==='正在派送' ? '' : 'warning' "
              disable-transitions>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="serviceman" label="领取人" align="center" width="100"></el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope" >
            <el-button size="mini" @click="handleClick(scope.row)">设置状态</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

<!-- 分页设置条 -->
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

<!--设置派件人弹出框-->
  <el-dialog
      title="设置快递代取信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
    <el-form :model="editDeliveryForm" style="width: 50%;margin: 0 auto;" >
      <el-form-item label="委托取件人">
        <el-input v-model="editDeliveryForm.serviceman" autocomplete="on" placeholder="请填写委托取件人信息"></el-input>
      </el-form-item>
      <el-form-item label="取件状态">
        <el-select v-model="editDeliveryForm.status" placeholder="请选择快递状态">
          <el-option label="待派发任务" value="待派发任务"></el-option>
          <el-option label="正在派送" value="正在派送"></el-option>
          <el-option label="已送达" value="已送达"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitEditDeliveryForm">确 定</el-button>
  </span>
  </el-dialog>

</div>
</template>

<script>
import {EditDeliveryInfo, getExpressDeliveryInfoForProperty} from "@/api/ExpressDelivery";

export default {
  name: "PropertyExpressDelivery",
  data(){
    return{
      total:'',
      dialogVisible:false,
      tableData:[{
        id:'',
        name:"",
        title:"",
        phone:"",
        deliveryCode:"",
        deliveryType:"",
        deliveryLocation:"",
        serviceman:"",
        createDate:"",
        status:""
      }],
      searchForm:{
        name:"",
        phone:"",
        pageNum: 1,
        pageSize: 10,
      },
      editDeliveryForm:{
        id:'',
        status:"",
        serviceman:""
      }
    }
  },
  created() {
    this.load()
  },
  methods:{
    //加载函数，用于更新完信息后加载
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
    //编辑快递信息弹出框
    handleClick(row){
      this.editDeliveryForm.id=row.id
      this.editDeliveryForm.status=row.status
      this.editDeliveryForm.serviceman=row.serviceman
      this.dialogVisible=true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
    },
    //快递信息提交框
    submitEditDeliveryForm(){
      this.dialogVisible = false
      console.log(this.editDeliveryForm)
      EditDeliveryInfo(this.editDeliveryForm).then(()=>{
        this.load()
        this.$notify({title: '成功', message: '包裹信息已更新！', type: 'success'});
      })
    }
  }
}
</script>

<style scoped>

</style>
