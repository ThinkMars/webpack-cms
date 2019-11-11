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