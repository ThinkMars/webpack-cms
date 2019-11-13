<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            v-for="item in cates"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->

      <ul class="photo-list">
        <router-link tag="li" v-for="item in photolist" :key="item.id" :to="'/home/photoinfo/' + item.id">
          <img v-lazy="item.img_url"/>
          <div class="info">
            <h1 class="info-title">
              {{ item.title }}
            </h1>
            <div class="body">
              {{ item.zhaiyao }}
            </div>
          </div>
        </router-link>
      </ul>
  </div>
</template>

<script>
// 1.导入js文件
import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      cates: [], // 所有分类的数组
      photolist: []
    };
  },
  created() {
    // mui('.mui-scroll-wrapper').scroll({
    //   deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    // });
    this.getAllCategory();
    // 默认进入页面就请求所有图片分类
    this.getPhotoListByCateId(0);
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面上后，执行这个钩子函数
    // 操作DOM元素要在这个生命周期函数里
    // 2.初始化
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    // 获取所有图片分类
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(data => {
        if (data.body.status === 0) {
          // 手动拼接处一个完整的 分类列表
          // console.log(data.body);
          data.body.message.unshift({ title: "全部", id: 0 });
          this.cates = data.body.message;
        }
      });
    },
    // 根据分类图片获取id
    getPhotoListByCateId (cateId) {
      this.$http.get('api/getimages/' + cateId).then(data => {
        if (data.body.status === 0) {
          this.photolist = data.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  // 为了提高页面的流畅度
  touch-action: pan-y;
}
.mui-slider {
  padding-top: 5px;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0,0,0,.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .body {
        font-size: 13px;
      }
    }
  }
}
</style>
