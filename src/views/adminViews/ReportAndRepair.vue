<template>
<div class="reportandrepair" style="line-height: 30px">
  <!-- 模糊查找reporter属性与repairType属性的输入框 -->
    <div style="width: 800px;float: left;margin-bottom: 30px">
      <el-input v-model="repairCase.reporter" style="width: 200px" placeholder="请输入报修人姓名"></el-input>
      <el-input v-model="repairCase.repairType" style="width: 200px;margin-left: 50px" placeholder="请输入维修类型"></el-input>
      <el-button type="primary" style="width: 100px;margin-left: 50px" @click="load">搜索</el-button>
    </div>

<!-- 报修与维修数据展示表 -->
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
              <el-table-column label="操作" fixed="right" align="center" width="120">
                <template slot-scope="scope" >
                  <el-button
                      size="mini"
                      @click="handleClick(scope.row)"
                     >编辑状态
                  </el-button>
                </template>
              </el-table-column>
      </el-table>
    </div>

<!-- 报修与维修数据展示表下方的页面选择与选择每组展示数据控件 -->
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page ="repairCase.pageNum"
          :page-sizes="[5,13,20,50]"
          :page-size="repairCase.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
    </div>

<!-- 编辑维修状态 -->
  <el-drawer
      title="编辑状态"
      :before-close="handleClose"
      :visible.sync="drawer"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="50%"
  >
    <EditStatusForm/>
    <div class="demo-drawer__footer">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
    </div>
  </el-drawer>

</div>
</template>

<script>

import {editStatus, reportRepairSearch} from "@/api/ReportAndRepair";
import EditStatusForm from '@/components/adminViews/EditStatusForm.vue';

export default {
  name: "ReportAndRepair",
  components: {
    EditStatusForm
  },
  data(){
    return{
      loading: false,
      total:0,
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
      repairCase:{
        reporter:'',
        repairType:'',
        pageNum:1,
        pageSize:5,
      },
      drawer: false,
      editStatusParam:[{
        id:0,
        serviceman:'',
        repairStatus:''
      }]
    }
  },
  created() {
    //请求分页查询数据
    this.load()
  },
  methods:{
    //选择分页查询表每页展示的数据条数，设置完成后由load重新请求
    handleSizeChange(pageSize){
      console.log(pageSize)
      this.repairCase.pageSize=pageSize
      this.load()
    },
    //选择分页查询表的展示页码，设置完成后由load重新请求
    handleCurrentChange(pageNum){
      console.log(pageNum)
      this.repairCase.pageNum=pageNum
      this.load()
    },
    //使用api封装的接口发送请求
    load(){
      reportRepairSearch(this.repairCase).then(res=>{
        this.tableData=res.data
        this.total=res.total
      })
    },
    //抽屉组件开启函数
    handleClick(row){
      this.$store.commit('setEditStatus',row)
      this.drawer=true
    },
    //抽屉组件关闭按钮处理函数
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
          .then(() => {
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 500);
          })
          .catch(() => {});
    },
    //抽屉组件"取消"按钮处理函数
    cancelForm() {
      this.drawer = false;
      this.loading = false;
      clearTimeout(this.timer);
    },
    //抽屉组件"提交"按钮处理函数
    submit(){
      this.editStatusParam=this.$store.getters.getEditStatus
      editStatus(this.editStatusParam)
      this.$refs.drawer.closeDrawer()
    },
    editStatus(data){
      editStatus(data).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
