<template>
  <div>
    <!--Search Box-->
    <div style="width: 800px; float: left; margin-bottom: 10px">
      <el-input v-model="searchForm.name" style="width: 200px" placeholder="Please enter the recipient's name"></el-input>
      <el-input v-model="searchForm.phone" style="width: 200px; margin-left: 50px" placeholder="Please enter the recipient's phone"></el-input>
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
          style="width: 100%;"
          size="mini"
      >
        <el-table-column type="selection" width="39"></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
        <el-table-column prop="name" label="Recipient" align="center" width="100"></el-table-column>
        <el-table-column prop="title" label="Title" align="center" width="80"></el-table-column>
        <el-table-column prop="phone" label="Contact Information" align="center" width="150"></el-table-column>
        <el-table-column prop="deliveryCode" label="Pickup Code" align="center" width="100"></el-table-column>
        <el-table-column prop="deliveryType" label="Package Type" align="center" width="150"></el-table-column>
        <el-table-column prop="deliveryLocation" label="Package Location" align="center" width="120"></el-table-column>
        <el-table-column prop="createDate" label="Creation Time" align="center" width="150"></el-table-column>
        <el-table-column prop="status" label="Status" align="center" width="130">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.status === 'Delivered' ? 'success' : scope.row.status === 'In Transit' ? '' : 'warning' "
                disable-transitions>{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="serviceman" label="Receiver" align="center" width="100"></el-table-column>
        <el-table-column label="Action" align="center" width="120">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleClick(scope.row)">Set Status</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Pagination Settings -->
    <div style="text-align: center; margin-top: 30px;">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm.pageNum"
          :page-sizes="[5, 13, 20, 50]"
          :page-size="searchForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
    </div>

    <!-- Set Delivery Person Dialog -->
    <el-dialog
        title="Set Delivery Information"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
      <el-form :model="editDeliveryForm" style="width: 50%; margin: 0 auto;">
        <el-form-item label="Recipient">
          <el-input v-model="editDeliveryForm.serviceman" autocomplete="on" placeholder="Please enter recipient information"></el-input>
        </el-form-item>
        <el-form-item label="Pickup Status">
          <el-select v-model="editDeliveryForm.status" placeholder="Please select delivery status">
            <el-option label="Pending Assignment" value="Pending Assignment"></el-option>
            <el-option label="In Transit" value="In Transit"></el-option>
            <el-option label="Delivered" value="Delivered"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="submitEditDeliveryForm">Confirm</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import { EditDeliveryInfo, getExpressDeliveryInfoForProperty } from "@/api/ExpressDelivery";

export default {
  name: "PropertyExpressDelivery",
  data() {
    return {
      total: '',
      dialogVisible: false,
      tableData: [{
        id: '',
        name: "",
        title: "",
        phone: "",
        deliveryCode: "",
        deliveryType: "",
        deliveryLocation: "",
        serviceman: "",
        createDate: "",
        status: ""
      }],
      searchForm: {
        name: "",
        phone: "",
        pageNum: 1,
        pageSize: 10,
      },
      editDeliveryForm: {
        id: '',
        status: "",
        serviceman: ""
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    // Load function to refresh information
    load() {
      getExpressDeliveryInfoForProperty(this.searchForm).then(res => {
        this.tableData = res.tableData
        this.total = res.total
      })
    },
    // Select the number of items displayed per page in the pagination table, and reload after setting
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.searchForm.pageSize = pageSize
      this.load()
    },
    // Select the page number to display in the pagination table, and reload after setting
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.searchForm.pageNum = pageNum
      this.load()
    },
    // Edit delivery information dialog
    handleClick(row) {
      this.editDeliveryForm.id = row.id
      this.editDeliveryForm.status = row.status
      this.editDeliveryForm.serviceman = row.serviceman
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('Are you sure you want to close?')
          .then(() => {
            done();
          })
          .catch(() => {});
    },
    // Submit delivery information form
    submitEditDeliveryForm() {
      this.dialogVisible = false
      console.log(this.editDeliveryForm)
      EditDeliveryInfo(this.editDeliveryForm).then(() => {
        this.load()
        this.$notify({ title: 'Success', message: 'Package information has been updated!', type: 'success' });
      })
    }
  }
}
</script>

<style scoped>

</style>
