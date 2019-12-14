# 这是一个项目

## 由于不同显示的tabs 空格数不同，可能缩进效果不同哈

## 我来做一个小的测试，看看能不能用哈哈哈

## 由于使用tab 键缩进，可能在不同编辑器上显示效果不同，包括GitHub，哈哈

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

## 发表评论
1. 为文本框双向绑定
2. 为发表按钮绑定点击事件
3. 检验评论内容是否为空，如果为空，Toast提示用户 评论内容不能为空，如果不为空，则发送请求，将请求发送给服务器
4. 当发表评论OK后，重新刷新列表，查看最新的评论
 + 如果调用getConment刷新列表，可能只看到最后一页 的评论，前几页的数据获取不到，
 + 换一种思路：当评论成功后，在客户端手动拼接一个 最新的评论对象，然后调用数组的unshift方法，把最新的评论追加到
   data中conments 的开头；这样就能完美实现刷新评论列表的功能

## 制作顶部滑动条
1. 借助MUI的 tab-top-swapper
2. 删除 mui-fullscreen 类的影响
3. 滑动条无法正常的滑动，查找官方文档发现 这是一个JS组件，需要初始化
 + 导入 mui.js
 + 调用官方提供的方法去初始化
 ```
 mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
 ```
4. 我们在初始化 滑动条的时候，导入mui.js出错：`Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
 + 经过我们合理推测，觉得可能是 mui.js 中用到了 'caller' 'callee' 'arguments' ,但是 webpack 打包好的 bundle.js中， 默认开启 严格模式 ，所以这两者冲突了
  + 解决方法：移除 webpack 中的严格模式   用插件 babel-plugin-transform-remove-strict-mode
   +  1. cnpm install babel-plugin-transform-remove-strict-mode -D
   +  2. 在.babelrc中设置：
      `{
        "plugins": ["transform-remove-strict-mode"]
      }`
   +  3. 第二种方法 ：在 .babelrc 文件添加以下代码 忽视该js文件 
      `{
        "ignore": [
          "./src/lib/mui/js/mui.js"
        ]
      }` 
   +  4. 当滑动条调试 OK后，发现 tabbar 无法正常工作，这时候我们把每个tabbar按钮中的样式`mui-tab-item`重新改一下名字

### 制作图片列表区域
1. 图片列表渲染需要用懒加载技术，我们可以用 Mint-UI 里的组件 `lazy-load`
2. 使用 `lazy-load` 渲染数据

### 实现了懒加载与图片样式美化

## 实现 点击图片跳转到 图片详情页面 
1. 在改造 router-link 元素时，需要用 tag 指定属性要渲染为 哪种元素  tag="li"

## 实现详情页面的布局与美化，同时渲染页面

## 实现 图片详情中 缩略图的功能
1. 使用插件 vue-preview 
2. 获取所有的图片列表，然后用v-for 指令渲染数据
3. 注意：img标签上的class不能去掉
4. 注意：每个图片对象数据中必须有 w 和 h 属性

## 尝试在手机上 调试和预览项目
1. 保证手机和电脑处于同一个WiFi中
2. 在自己项目的package.json文件中，在 dev 脚本中，添加一个 --host 指令，把当前电脑的WiFi IP地址，设置为 --host 的指令值
 + 在cmd 中运行 `ipconfig` 查看无线网的 IP地址

## VUEX
 1. vuex是vue配套的 公共数据管理工具，可以把一些共享的数据，保存到vuex中，方便整个程序中的任何组件直接获取或修改我们的公共数据
 2. vuex是一个全局的共享数据储存区域，就相当于一个数据的仓库

这是一个测试3
