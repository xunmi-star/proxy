import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//element-ui插件
import 'element-ui/lib/theme-chalk/index.css'
import { Tag, Pagination, DatePicker, TimePicker, Table, TableColumn, Popover, Button, Select, Option } from 'element-ui';
Vue.use(Tag).use(Pagination).use(DatePicker).use(TimePicker).use(Table).use(TableColumn).use(Popover).use(Button).use(Select).use(Option)

// vant插件
import 'vant/lib/index.css';
import {Dialog, Field, DropdownMenu, DropdownItem, List, Cell } from 'vant'
Vue.use(Dialog).use(Field).use(DropdownMenu).use(DropdownItem).use(List).use(Cell)

//引入icon-font图标
import "../src/assets/icon-font/iconfont.css"

//使用时间过滤器
Vue.use(require('vue-moment'));

new Vue({
  router,
  store,
  //防止刷新页面时store数据丢失
  mounted(){
    window.addEventListener('unload', this.saveState)
  },
  methods: {
      saveState() {
          sessionStorage.setItem('state', JSON.stringify(this.$store.state))
      }
  },

  render: h => h(App)
}).$mount('#app')

