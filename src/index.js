//  console.log("ok");
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// 1.导入路由的 模块
import VueRouter from 'vue-router'
// 1.1手动引用模块
Vue.use(VueRouter)

// 导入 MUI 的 样式
import './lib/mui/css/mui.css'
// 导入扩展 样式
import './lib/mui/css/icons-extra.css'


// 2.导入路由 模块
import router from './router.js'


// 导入App 组件
import app from './App.vue'

// 按需导入Mint-UI 组件
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

let vm = new Vue({
  el: '#app',
  render: c => c(app),
  // 3.挂在路由对象到实例上
  router
})
