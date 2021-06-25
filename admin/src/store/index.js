import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    $data: {},
    menu: ''
  },
  mutations: {
     // 动态导航
     setMenu(state, data){
      state.menu = data
      }
  },
  actions: {
  },
  modules: {
  }
})
