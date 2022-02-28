import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test:''
  },
  mutations: {
    changeTest(state,test){
      state.test=test
    }
  },
  actions: {
  },
  modules: {
  }
})
