//  console.log("ok");
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刚进入网站，肯定会调用index.js，在调用的时候，在本地存储中把购物车的数据放到car 中
let car = JSON.parse(localStorage.getItem('car')||'[]');
const store = new Vuex.Store({
  state: { // this.$store.state.***
    // car: [] // 将购物车中商品的数据用一个数组存起来，在car数组中存商品的对象，咱们可以暂时将商品的对象设计成
    // { id: 商品id, count: 商品数量, price: 商品的单价, selected: 商品是否被选中 }
    car: car
  },
  mutations: { // this.$store.commit('方法名', '唯一参数')
    addToCar (state, goodsinfo) {
      // 点击加入购物车，将商品的对象添加到car
      // 1. 如果购物车之前就已经有这个对应的商品，那么只需要更新数量
      // 2. 如果没有，则直接把商品数据，push到car中
      let flag = false;
      // 假设购物车中没有找到对应的商品
      state.car.some ((item) => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true
          return true; // 结束some
        }
      })
      if (!flag) {
        state.car.push(goodsinfo);
      }

      // 当更新 car 之后，把car 数组存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsInfo (state, goodsinfo) {
      // 修改购物车中商品的数量，不能直接调用 addToCar
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      })
      // 当商品数量更改完，把最新的购物车数据，保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    removeFromCar (state, id) {
      // 根据id，从store中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1);
          return true;
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateSelected (state, info) {
      state.car.some(item => {
        if(item.id == info.id) {
          item.selected = info.selected;
        }
      });
      // 把最新的所有购物车的状态保存到 store中去
      localStorage.setItem('car', JSON.stringify(state.car));
    }
  },
  getters: { // this.$store.getters.***
    getAllCount (state) {
      let c = 0;
      state.car.forEach(item => {
        c += item.count;
      })
      return c;
    },
    getGoodsCount (state) {
      let o = {};
      state.car.forEach((item) => {
        o[item.id] = item.count;
      })
      return o;
    },
    getGoodsSelected (state) {
      let o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      })
      return o;
    },
    getGoodsCountAndAmount (state) {
      let o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count;
          o.amount += item.price * item.count;
        }
      })
      return o;
    }
  }
})


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
  router,
  store  // 挂载store状态管理对象
})
