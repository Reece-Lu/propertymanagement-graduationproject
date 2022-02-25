<template>
<div class="reportandrepair">
    <div style="width: 800px;float: left">
      <el-input v-model="username" style="width: 500px" placeholder="请输入昵称"></el-input>
      <el-button type="primary" style="width: 100px;margin-left: 50px" @click="load">搜索</el-button>
    </div>
    <el-table
        :data="tableData"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
       >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="120"></el-table-column>
      <el-table-column prop="username" label="用户名" width="120"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="phone" label="电话" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="120"></el-table-column>

      <el-table-column label="操作">
        <template >
          <el-button
              size="mini"
              >修改
          </el-button>
          <el-button
              size="mini"
              type="danger"
             >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 30px;">

      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page ="pageNum"
          :page-sizes="[2,5,15,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>

    </div>


</div>
</template>

<script>
export default {
  name: "ReportAndRepair",
  data(){
    return{
      tableData:[],
      total:0,
      pageNum:1,
      pageSize:5,
      username:""
    }
  },
  created() {
    //请求分页查询数据
    this.load()
  },
  methods:{
    handleSizeChange(pageSize){
      console.log(pageSize)
      this.pageSize=pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      console.log(pageNum)
      this.pageNum=pageNum
      this.load()
    },
    load(){
      fetch("http://localhost:9090/user/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&username="+this.username).then(res=>res.json()).then(res=>{
        console.log(res)
        this.tableData=res.data
        this.total=res.total
      })
    }
  }
}
</script>

<style scoped>

</style>
