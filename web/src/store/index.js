import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: 'more'
  },
  mutations: {
    setStatus (state, data) {
        state.status = data
    }
  },
  actions: {
  },
  modules: {
  }
})
