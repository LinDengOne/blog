import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: 'more',
    loading: true
  },
  mutations: {
    setStatus (state, data) {
        state.status = data
    },
    setLoading (state, data){
        state.loading = data
    }
  },
  actions: {
  },
  modules: {
  }
})
