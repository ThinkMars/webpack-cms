<template>
  <div class="goods-list">
    <!-- 商品列表 -->
    <!-- 如果链接要传递参数，则需要重新写成绑定形式 :to=""，并在里面传递参数 -->
    <!-- <router-link :to="'/home/goodsinfo/' + item.id" class="goods-item" v-for="item in goodslist" :key="item.id" tag="div">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link> -->

    <!-- 在网页中有两中跳转方式： -->
    <!-- 方式1：使用 a 标签的形式 叫做标签跳转 -->
    <!-- 方式2：使用window.location.href 的形式，叫做 编程式导航 -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetial(item.id)">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <!-- 加载按钮 -->
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>

export default {
  data() {
    // data 是私有数据
    return {
      goodslist: [],
      pageIndex: 1 // 分页数
    }
  },
  created () {
    this.getGoodsList();
  },
  methods: {
    getGoodsList () {
      // 获取商品列表
      this.$http.get('api/getgoods?pageindex=' + this.pageIndex)
      .then(data => {
        if (data.body.status === 0) {
          // console.log(data.body);
          // this.goodslist = data.body.message;
          this.goodslist = this.goodslist.concat(data.body.message);
        }
      });
    },
    getMore () {
      this.pageIndex++;
      this.getGoodsList();
    },
    goDetial (id) {
      // 使用JS的形式进行路由跳转 到图片详情  https://router.vuejs.org/zh/guide/essentials/navigation.html
      // 注意：区分 this.$route 和 this.$router 这两个对象
      // 其中，this.$route 是路由参数对象， 所有路由的参数，params,query都属于它
      // 其中，this.$router 是一个导航对象，用它可以方便的 使用JS代码，实现路由的前进、后退、跳转到新的url地址
      
      // 第一种
      // this.$router.push('/home/goodsinfo/' + id);
      // 2传对象
      // this.$router.push({ path: '/home/goodsinfo/' + id});
      // 3 命名路由 在 router 里的path 添加一个name属性
      this.$router.push({ name: 'goodsinfo', params: { id: id }})
    }
  }
}
</script>

<style lang="scss">
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 7px;
    .goods-item {
      width: 49%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      margin: 3px 0;
      padding: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 293px;
      img {
        width: 100%;
      }
      .title {
        font-size: 14px;
      }
      .info {
        background-color: #eee;
        p {
          margin: 0;
          padding: 5px;
        }
        .price {
          .now {
            color: red;
            font-weight: bold;
            font-size: 16px;
          }
          .old {
            text-decoration: line-through;
            font-size: 12px;
            margin-left: 10px;
          }
        }
        .sell {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }
      }
    }
  }
</style>