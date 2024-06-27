<template>
  <!--Report and Repair Page -> Edit Repair Status -> Component in Drawer-->
  <div class="demo-drawer__content">
    <el-form :model="editStatus" style="width: 90%;margin: 0 auto;">
      <el-descriptions title="Repair Information" direction="vertical" :column="4" border>
        <el-descriptions-item label="Repair ID">{{this.$store.state.editStatus.id}}</el-descriptions-item>
        <el-descriptions-item label="Reporter">{{this.$store.state.editStatus.reporter}}</el-descriptions-item>
        <el-descriptions-item label="Contact Information">{{this.$store.state.editStatus.reporterPhone}}</el-descriptions-item>
        <el-descriptions-item label="Report Time">{{this.$store.state.editStatus.reportTime}}</el-descriptions-item>
        <el-descriptions-item label="Repair Type" :span="2"> <el-tag size="small">{{this.$store.state.editStatus.repairType}}</el-tag></el-descriptions-item>
        <el-descriptions-item label="Location">{{this.$store.state.editStatus.repairLocation}}</el-descriptions-item>
        <el-descriptions-item label="Description">{{this.$store.state.editStatus.repairDescription}}</el-descriptions-item>
      </el-descriptions>
      <el-form-item label="Serviceman">
        <el-input v-model="editStatus.serviceman" autocomplete="on" placeholder="Please enter the serviceman information"></el-input>
      </el-form-item>
      <el-form-item label="Repair Status">
        <el-select v-model="editStatus.repairStatus" placeholder="Please select the repair request status">
          <el-option label="Pending Assignment" value="Pending Assignment"></el-option>
          <el-option label="On the Way" value="On the Way"></el-option>
          <el-option label="Under Repair" value="Under Repair"></el-option>
          <el-option label="Repaired" value="Repaired"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EditStatusForm",
  data() {
    return {
      editStatus: {
        id: '',
        reporter: '',
        reporterPhone: '',
        reportTime: '',
        repairType: '',
        repairLocation: '',
        repairDescription: '',
        serviceman: '',
        repairStatus: ''
      }
    }
  },
  watch: {
    // Watch the serviceman property in the input box (editStatus.serviceman), and directly update the store with new data when the data changes
    serviceman() {
      this.$store.commit('setEditStatus', this.editStatus)
    },
    // Watch the repairStatus property in the input box (editStatus.repairStatus), and directly update the store with new data when the data changes
    repairStatus() {
      this.$store.commit('setEditStatus', this.editStatus)
    }
  },
  created() {
    // When the page loads, access the row data in the store using the getEditStatus method to display the detailed information of the repair event to be edited
    this.editStatus = this.$store.getters.getEditStatus
  }
}
</script>

<style scoped>

</style>
