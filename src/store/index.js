import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //用于报修维修页ReportAndRepair.vue与子组件EditStatusForm.vue的数据传递
    editStatus:{}
  },
  getters:{
    //用于报修维修页ReportAndRepair.vue与子组件EditStatusForm.vue的数据接收
    getEditStatus: state =>state.editStatus
  },
  mutations: {
    //报修维修页ReportAndRepair.vue与子组件EditStatusForm.vue的数据发送到store
    setEditStatus(state,editStatus){
      state.editStatus=editStatus
    }
  },
  actions: {
  },
  modules: {
  }
})
