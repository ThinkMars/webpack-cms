<template>
  <div>
    <!-- <h1>首页组件</h1> -->
    <!-- 自动播放，4秒一次 -->
    <mt-swipe :auto="3000">
      <mt-swipe-item class="slide1" v-for="item in SwipePhotos" :key="item.url">
        <img :src="item.url" alt />
      </mt-swipe-item>
    </mt-swipe>

    <!-- 选用 六个格子成六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-home"></span>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-email">
            <span class="mui-badge">5</span>
          </span>
          <div class="mui-media-body">消息</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">图片反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">商品搜索</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
      
    </ul>
  </div>
</template>

<script>
// 按需导入组件
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      SwipePhotos: []
    };
  },
  created() {
    // 在这个阶段获取Ajax请求
    this.getSwipePhotos();
  },
  methods: {
    // const api = "https://api.asilu.com/bg/";
    getSwipePhotos() {
      this.$http.jsonp("https://api.asilu.com/bg/").then(result => {
        if (result.status === 200) {
          //成功了
          console.log(result.body.images[0].url);
          this.SwipePhotos = result.body.images;
          // Toast("加载轮播图失败");
        } else {
          //失败
          Toast("加载轮播图失败");
        }
      });
    }
  }
};
</script>

<style lang="scss">
.mint-swipe {
  height: 200px;
  margin-top: 10px;

  // 嵌套写法

  .mint-swipe-item {
    // & 为交集选择器符号
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: blue;
    }
    &:nth-child(3) {
      background-color: green;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>
