# 这是一个项目

## 我来做一个小的测试，看看能不能用哈哈哈

## 开源协议暂时没有

## 用传统方式 命令行吧把修改后的代码添加到 GitHub
1. git add
2. git commit -m "提交信息"
3. git push

## 制作首页app组件
1. 完成 Header 区域，使用的是 Mint-UI中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 里的Tabbar.html
 + 在制作购物车 小图标时，操作稍微复杂
 + 拷贝 扩展字体库 的.css和.ttf 文件到项目中
 + 拷贝相应图标的类
3. 要在中间区域放置一个 router-view 用来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，跳转到相应的 路由组件

## 制作首页轮播图

## 加载首页轮播图数据
1. 获取数据，我选用axios  cnpm install --save axios vue-axios  这个麻烦，我们先用 vue-resource吧
2. 获取到的数据要保存到 data 里
3. 用 v-for 渲染数据

## 改造 新闻资讯，路由链接

## 改造新闻资讯页面制作
1. 绘制页面 使用MUI中的media-list
2. 使用 vue-resource 获取数据
3. 渲染数据

## 实现新闻列表 点击跳转到详情
1. 把列表中的每一项都改造成 router-link，同时，提供唯一 的Id标识符
2. 创建新闻详情组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的 路由地址 和 组件页面对应起来

## 实现新闻详情 的页面布局 和数据渲染

## 单独封装一个 comment.vue 子组件
1. 先创建一个 单独的 comment.vue 子组件模板
2. 在需要使用的 comment 组件页面中 手动导入 comment 组件
3. 在父组件中 注册为子组件
4. 在父组件中引用

## 获取所有的评论数据，渲染到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮加载点击事件，在事件中加载下一页数据
2. 点击 加载更多 按钮， 让pageIndex 自增， 再调用getComments 方法，获取下一页方法
3. 为了防止新数据覆盖老数据的情况，在加载新页面的时候，调用数组方法concat拼接新数据