<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time|dataFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>
    <hr>

    <!-- 缩略图区域 -->
    <!-- 用法有所改变，请点击 https://github.com/LS1231/vue-preview -->
    <div class="thumbs">
      <vue-preview :slides="list"></vue-preview>
    </div>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
    
  </div>
</template>

<script>
// 评论子组件
import comment from '../subconponents/comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,  // 本详情页的路由对应的 id
      photoinfo: [],
      list: [] // 缩略图数组
    }
  },
  created () {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo () {
      // 获取图片的详情
       this.$http.get('api/getimageInfo/' + this.id)
       .then((data) => {
         if (data.body.status === 0) {
           this.photoinfo = data.body.message[0];
         }
       })
    },
    getThumbs () {
      // 获取缩略图
      this.$http.get('api/getthumimages/' + this.id)
       .then((data) => {
         if (data.body.status === 0) {
           // 循环每个图片数据，添加图片的宽和高
           data.body.message.forEach(element => {
             element.w = 600;
             element.h = 400;
             element.msrc = element.src;//msrc：小图像,到时候让后端传个小图像过来 这是新版缩略图必须加的一句
           });
           // 把完整的数据保存到 list 中
           this.list = data.body.message;
         }
       })
    }
  },
  components: {
    // 注册评论子组件
    'cmt-box': comment
  }
}
</script>

<style lang="scss" scoped>
  .photoinfo-container {
    padding: 3px;
    h3 {
      color: #26A2FF;
      font-size: 15px;
      text-align: center;
      margin: 15px 0;
    }
    .subtitle {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }
    .content {
      font-size: 13px;
      line-height: 15px;
    }
  }
</style>

// 这里时网友写的样式参考
<style lang="scss">
.thumbs {
  .my-gallery {
    display: flex;
    flex-wrap: wrap;
  }
  figure {
    width: 100px;
    height: 100px;
    margin: 10px;
    box-shadow: 0 0 8px #999;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>