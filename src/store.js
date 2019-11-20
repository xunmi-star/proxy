import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
    userData: "",
    imgCode:"",
    goodsInfoItem:"",
  },
  mutations: {
    userForLogin(state,data){       //登录信息
      state.userData = data
    },
    setCodeForVertfyCode(state,data){ //验证码
      state.imgCode = data
    },
    goodsInfoByAnalysis(state, data){  //点击订单详情
      state.goodsInfoItem = data
    },
  },
  actions: {

  }
})
