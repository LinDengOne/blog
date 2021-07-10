import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: 'more',
    loading: true,
    isReply: false,
    replyObj:{}


  },
  mutations: {
    setStatus (state, data) {
        state.status = data
    },
    setLoading (state, data){
        state.loading = data
    },
    setisReply (state, data){
        state.isReply = data
    },
    setreplyObj (state, data){
        state.replyObj.parent_id = data.parent_id
        state.replyObj.type = data.type
        state.replyObj.reply_name = data.reply_name
    }
  },
  actions: {
  },
  modules: {
  }
})
