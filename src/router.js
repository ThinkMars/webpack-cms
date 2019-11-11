// 导入路由模块
import VueRouter from 'vue-router';


// 导入组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

// 创建路由实例
const router = new VueRouter({
  routes: [ // 匹配路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer }
  ],
  // 覆盖路由高亮的 样式类，默认为 router-link-active
  linkActiveClass: 'mui-active'
})
// 向外暴露路由实例
export default router