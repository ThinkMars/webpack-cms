const path = require('path');
// htmlWebpackPlugin的作用是根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 当以命令行运行webpack或webpack-dev-server的时候，工具会发现，我们并没有提供要打包的文件的出口和入口文件，
// 此时，它会检查根目录中的配置文件，并读取这个文件，就拿到导出的配置对象，然后根据这个对象进行打包构建。
module.exports = {
  // 选择打包成开发版本还是生产版本
  // mode: 'development',
  entry: './src/index.js', // 这是入口文件
  output: { // 这是输出配置
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  },
  plugins: [ // 所有webpack插件配置节点
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'), // 模板文件路径
      filename: 'index.html'
    }),
    new VueLoaderPlugin() // new 实例
  ],
  module: { // 配置所有第三方loader模块
    rules: [ // 第三方模块的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理css文件的loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理less文件的loader
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理scss文件的loader

      // { test: /\.(jpeg|png|gif|bmp|jpg)$/, use: 'url-loader?limit=39209' } // 处理图片url地址
      { test: /\.(jpeg|png|gif|bmp|jpg)$/, use: 'url-loader?limit=39209&name=[hash:8]-[name].[ext]' }, // 保留原名
      // limit给定的值，是图片的大小限定字节数，如果引用的图片大于给定的limit值，
      // 则不会转化为base64格式的字符串，如果小于，则转换为base64的路径，这样可以避免图片名称重复
      { test: /\.(fft|eot|svg|woff|woff2|ttf)$/, use: 'url-loader' }, // 处理字体文件
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置Babel处理ES6语法
      { test: /\.vue$/, use: 'vue-loader' } // 处理.vue文件的loader
    ]
  },
  resolve: {
    alias: { // 修改Vue被导入时候的包的路径
      // 'vue$': "vue/dist/vue.js"
    }
  }
}