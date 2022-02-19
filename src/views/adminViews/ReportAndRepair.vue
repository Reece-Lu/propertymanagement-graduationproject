<template>
<div class="reportandrepair">
    <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
       >
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="age"
          label="年龄"
          width="120">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别"
          width="120">
      </el-table-column>
      <el-table-column
          prop="department"
          label="部门"
          width="150">
      </el-table-column>
      <el-table-column
          prop="floor"
          label="楼层"
          width="120">
      </el-table-column>
      <el-table-column
          prop="area"
          label="区域"
          width="120">
      </el-table-column>
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
          layout="prev, pager, next"
          :total="total"
          >
      </el-pagination>
    </div>



</div>
</template>

<script>
export default {
  name: "ReportAndRepair"
}
</script>

<style scoped>

</style>
