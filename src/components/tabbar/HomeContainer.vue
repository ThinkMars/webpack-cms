<template>
  <div>
    <!-- 轮播图区域 -->
    <!-- 自动播放，4秒一次 -->
    <!-- 通过绑定，父组件向子组件传值 -->
    <swiper :SwipePhotos="SwipePhotos" :isfull="true"></swiper>

    <!-- 选用 六个格子成六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-home"></span>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <span class="mui-icon mui-icon-email">
            <!-- <span class="mui-badge"></span> -->
          </span>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">商品购买</div>
        </router-link>
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
import swiper from '../subconponents/swiper.vue'

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
          // console.log(result.body.images[0].url);
          this.SwipePhotos = result.body.images;
        } else {
          //失败
          Toast("加载轮播图失败");
        }
      });
    }
  },
  components: {
    swiper
  }
};
</script>

<style lang="scss">

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>
