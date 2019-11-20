import Vue from 'vue'
import Router from 'vue-router'
import businessSys from "./views/BusinessSys.vue"
import Home from './views/Home.vue'
import Login from "./views/Login.vue"
import goodsLink from "./views/GoodsLink.vue"
import analysis from "./views/Analysis.vue"
import orderInfo from "./views/OrderInfo.vue"
import goodsSys from "./views/GoodsSys.vue"

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Login,
      name:"temp1",
      redirect:'/proxy/login',
    },
    {
      path: '/proxy/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/proxy/businessSys',
      name: 'businessSys',
      component: businessSys
    },
    {
      path: '/proxy/home',
      name: 'home',
      component: Home
    },
    {
      path: '/proxy/analysis',
      name: 'analysis',
      component: analysis
    },
    {
      path: '/proxy/goodsLink',
      name: 'goodsLink',
      component: goodsLink
    },
    {
      path: '/proxy/analysis/orderInfo',
      name: 'orderInfo',
      component: orderInfo
    },
    {
      path: '/proxy/goodsSys',
      name: 'goodsSys',
      component: goodsSys
    },
  ]
})
