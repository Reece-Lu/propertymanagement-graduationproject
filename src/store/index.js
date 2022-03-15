import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //用于报修维修页ReportAndRepair.vue与子组件EditStatusForm.vue的数据传递
    editStatus:"",
    userId:"",
    name:""
  },
  getters:{
    //用于报修维修页ReportAndRepair.vue与子组件EditStatusForm.vue的数据接收
    getEditStatus: state =>state.editStatus,
    //存储登陆账号的Id
    getUserId: state => state.userId,
    //存储登陆姓名
    getName: state => state.name
  },
  mutations: {
    //报修维修页ReportAndRepair.vue与子组件EditStatusForm.vue的数据发送到store
    setEditStatus(state,editStatus){
      state.editStatus=editStatus
    },
    setUserId(state,userId){
      state.userId=userId
    },
    setName(state,name){
      state.name=name
    }
  },
  actions: {
  },
  modules: {
  }
})
