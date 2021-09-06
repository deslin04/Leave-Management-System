import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({



  state: {
    empId: '',
    empLeaves: '',
    profile: '',
    isLogin: '',
    repOfficerLeaves:'',
  },
  mutations: {
    CHANGE_EMPID(state, payload) {
      state.empId = payload
    },

    CHANGE_EMPLEAVES(state, payload) {
      state.empLeaves = payload
    },

    CHANGE_USER_PROFILE(state, payload) {
      state.profile = payload
    },

    CHANGE_IS_LOGIN(state, payload) {
      state.isLogin = payload

    },

    CHANGE_REPOFFICER_LEAVES(state, payload) {
      state.repOfficerLeaves = payload

    }


  },
  actions: {
    isLogin(context, value) {
      context.commit("CHANGE_IS_LOGIN", value)

    },

    userId(context, value) {
      context.commit("CHANGE_EMPID", value)
    },

    userLeaves(context, value) {
      context.commit("CHANGE_EMPLEAVES", value)
    },

    userProfile(context, value) {
      context.commit("CHANGE_USER_PROFILE", value)
    },

    
    repOfficerLeaves(context, value) {
      context.commit("CHANGE_REPOFFICER_LEAVES", value)
    },

  
  },

  getters: {
    getEmpId(state) {
      return state.empId
    },

    getIsLogin(state) {
      return state.isLogin
    },

    getEmpLeaves(state) {
      return state.empLeaves
    },

    getProfile(state) {
      return state.profile
    },

    getRepLeaves(state) {
      return state.repOfficerLeaves
    },


  },
  modules: {
  }
})
