// console.log("ok");
import Vue from 'vue'


// 导入 MUI 的样式
import './lib/mui/css/mui.css'


// 导入App组件
import app from './App.vue'

// 按需导入Mint-UI 组件
import { Header } from 'mint-ui'
Vue.component(Header.name, Header);

let vm = new Vue({
  el: '#app',
  render: c => c(app)
})