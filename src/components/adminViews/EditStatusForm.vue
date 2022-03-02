<template>
<!--报修维修页->编辑维修状态->抽屉中的组件-->
    <div class="demo-drawer__content">
      <el-form :model="editStatus" style="width: 90%;margin: 0 auto;" >
        <el-descriptions title="报修信息" direction="vertical" :column="4" border>
          <el-descriptions-item label="报修编号">{{this.$store.state.editStatus.id}}</el-descriptions-item>
          <el-descriptions-item label="报修人">{{this.$store.state.editStatus.reporter}}</el-descriptions-item>
          <el-descriptions-item label="联系方式">{{this.$store.state.editStatus.reporterPhone}}</el-descriptions-item>
          <el-descriptions-item label="报修时间">{{this.$store.state.editStatus.reportTime}}</el-descriptions-item>
          <el-descriptions-item label="报修类型" :span="2"> <el-tag size="small">{{this.$store.state.editStatus.repairType}}</el-tag></el-descriptions-item>
          <el-descriptions-item label="地点">{{this.$store.state.editStatus.repairLocation}}</el-descriptions-item>
          <el-descriptions-item label="描述">{{this.$store.state.editStatus.repairDescription}}</el-descriptions-item>
        </el-descriptions>
        <el-form-item label="维修人">
          <el-input v-model="editStatus.serviceman" autocomplete="on" placeholder="请填写维修人员信息"></el-input>
        </el-form-item>
        <el-form-item label="维修状态">
          <el-select v-model="editStatus.repairStatus" placeholder="请选择维修申请状态">
            <el-option label="待派发" value="待派发"></el-option>
            <el-option label="正在前往" value="正在前往"></el-option>
            <el-option label="正在维修" value="正在维修"></el-option>
            <el-option label="已维修" value="已维修"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: "EditStatusForm",
  data(){
    return{
      editStatus:{
        id:'',
        reporter:'',
        reporterPhone:'',
        reportTime:'',
        repairType:'',
        repairLocation:'',
        repairDescription:'',
        serviceman:'',
        repairStatus:''
      }
    }
  },
  watch:{
    //监听输入框中维修人属性的数据（editStatus.serviceman）,当数据发生改变时，直接向store更新新数据
    serviceman(){
      this.$store.commit('setEditStatus',this.editStatus)
    },
    //监听输入框中维修人属性的数据（editStatus.setEditStatus）,当数据发生改变时，直接向store更新新数据
    repairStatus(){
      this.$store.commit('setEditStatus',this.editStatus)
    }
  },
  created() {
    //当页面加载时，访问store中的row数据，使用方法getEditStatus，用于展示将要编辑报修事件的详细信息
    this.editStatus=this.$store.getters.getEditStatus
  }
}
</script>

<style scoped>

</style>
