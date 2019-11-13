//  console.log("ok");
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
// 设置根路径  这是外部的接口地址
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
// 设置post请求时的数据格式，默认为JSON
Vue.http.options.emulateJSON = true;

// 1.导入路由的 模块
import VueRouter from 'vue-router'
// 1.1手动引用模块
Vue.use(VueRouter)

// 导入时间插件(神器)
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dataFormat', (dataStr, pattern = "YYYY-MM-DD HH:MM:ss") => {
  return moment(dataStr).format(pattern)
})

// 导入 MUI 的 样式
import './lib/mui/css/mui.css'
// 导入扩展 样式
import './lib/mui/css/icons-extra.css'


// 2.导入路由 模块
import router from './router.js'


// 导入App 组件
import app from './App.vue'

// 按需导入Mint-UI 组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// // Vue.component(Lazyload.name, Lazyload);
// Vue.use(Lazyload)

// 全部导入Mint-UI
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

let vm = new Vue({
  el: '#app',
  // 插值app组件
  render: c => c(app),
  // 3.挂在路由对象到实例上
  router
})
