<template>
  <div class="reportandrepair" style="line-height: 30px">
    <!-- Search boxes for fuzzy search of reporter and repairType properties -->
    <div style="width: 800px; float: left; margin-bottom: 30px">
      <el-input v-model="repairCase.reporter" style="width: 200px" placeholder="Please enter the reporter's name"></el-input>
      <el-input v-model="repairCase.repairType" style="width: 200px; margin-left: 50px" placeholder="Please enter the repair type"></el-input>
      <el-button type="primary" style="width: 100px; margin-left: 50px" @click="load">Search</el-button>
    </div>

    <!-- Repair and Maintenance Data Display Table -->
    <div id="reportRepairTable">
      <el-table
          :data="tableData"
          border
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%;"
          size="mini"
      >
        <el-table-column type="selection" width="39"></el-table-column>
        <el-table-column fixed prop="id" label="ID" align="center" width="40"></el-table-column>
        <el-table-column fixed prop="reporter" label="Reporter" align="center" width="100"></el-table-column>
        <el-table-column prop="reporterPhone" label="Reporter Phone" align="center" width="120"></el-table-column>
        <el-table-column prop="reportTime" label="Report Time" align="center" width="150"></el-table-column>
        <el-table-column prop="repairType" label="Repair Type" align="center" width="70"></el-table-column>
        <el-table-column prop="repairLocation" label="Location" align="center" width="200"></el-table-column>
        <el-table-column prop="repairDescription" label="Description" align="center" width="300"></el-table-column>
        <el-table-column fixed="right" prop="serviceman" label="Serviceman" align="center" width="100"></el-table-column>
        <el-table-column fixed="right" prop="repairStatus" label="Repair Status" align="center" width="120"></el-table-column>
        <el-table-column label="Actions" fixed="right" align="center" width="120">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleClick(scope.row)">Edit Status</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Pagination and page size selection controls below the repair and maintenance data display table -->
    <div style="text-align: center; margin-top: 30px;">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="repairCase.pageNum"
          :page-sizes="[5, 13, 20, 50]"
          :page-size="repairCase.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
    </div>

    <!-- Edit Repair Status -->
    <el-drawer
        title="Edit Status"
        :before-close="handleClose"
        :visible.sync="drawer"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
        size="50%"
    >
      <EditStatusForm/>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">Cancel</el-button>
        <el-button type="primary" @click="submit" :loading="loading">{{ loading ? 'Submitting...' : 'Confirm' }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { editStatus, reportRepairSearch } from "@/api/ReportAndRepair";
import EditStatusForm from '@/components/adminViews/EditStatusForm.vue';

export default {
  name: "ReportAndRepair",
  components: {
    EditStatusForm
  },
  data() {
    return {
      loading: false,
      total: 0,
      tableData: [{
        id: '',
        reporter: '',
        reporterPhone: '',
        reportTime: '',
        repairType: '',
        repairLocation: '',
        repairDescription: '',
        serviceman: '',
        repairStatus: ''
      }],
      repairCase: {
        reporter: '',
        repairType: '',
        pageNum: 1,
        pageSize: 5,
      },
      drawer: false,
      editStatusParam: [{
        id: 0,
        serviceman: '',
        repairStatus: ''
      }]
    }
  },
  created() {
    // Request data for paginated search
    this.load()
  },
  methods: {
    // Select the number of items displayed per page in the pagination table, and reload after setting
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.repairCase.pageSize = pageSize
      this.load()
    },
    // Select the page number to display in the pagination table, and reload after setting
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.repairCase.pageNum = pageNum
      this.load()
    },
    // Send request using the API wrapped interface
    load() {
      reportRepairSearch(this.repairCase).then(res => {
        this.tableData = res.data
        this.total = res.total
      })
    },
    // Function to open the drawer component
    handleClick(row) {
      this.$store.commit('setEditStatus', row)
      this.drawer = true
    },
    // Drawer component close button handler
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('Exit modification?')
          .then(() => {
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // The animation closure requires some time
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 500);
          })
          .catch(() => {
            this.drawer = false;
          });
    },
    // Drawer component "Cancel" button handler
    cancelForm() {
      this.drawer = false;
      this.loading = false;
      clearTimeout(this.timer);
    },
    // Drawer component "Submit" button handler
    submit() {
      this.editStatusParam = this.$store.getters.getEditStatus
      editStatus(this.editStatusParam)
      this.$refs.drawer.closeDrawer()
    },
    editStatus(data) {
      editStatus(data).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
