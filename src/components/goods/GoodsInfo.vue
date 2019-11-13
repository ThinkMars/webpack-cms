<template>
  <div class="goodsinfo-container">
    <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
    <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :SwipePhotos="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->

    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>购买数量：<numberbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numberbox></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>

            <!-- 分析：如何在点击 加入购物车 后拿到选择的数量 -->
            <!-- 1. 分析发现：按钮属于goodsinfo 页面，数字属于 numberbox 组件 -->
            <!-- 2. 涉及到了父子组件的嵌套了，所以，无法在goodsinfo 页面中获取到 选中的商品数量值 -->
            <!-- 3. 这就涉及到子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用机制的本质：父向子传递方法，子调用这个方法，同时把 数据 当作参数 传递给父组件 -->
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time|dataFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
// 轮播图
import swiper from '../subconponents/swiper.vue'
// 数字选择框
import numberbox from '../subconponents/goodsinfo_numberbox.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [], // 轮播图的数据
      goodsinfo: {},
      ballFlag: false, // 小球是否显示 
      selectedCount: 1 // 用户选中的商品数量，m默认为 1
    }
  },
  created () {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu () {
      this.$http.get('api/getthumimages/' + this.id)
      .then ((result) => {
        if (result.body.status === 0) {              
          // 先循环轮播图数组中的每一项，为item添加 url 属性，因为轮播图中，只认识item.url,不认识 item.src
          result.body.message.forEach(element => {
            element.url = element.src;
          });
          this.lunbotu = result.body.message;
        }
      })
    },
    getGoodsInfo () {
      this.$http.get('api/goods/getinfo/' + this.id)
      .then ((result) => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      })
    },
    // 使用编程式导航
    goDesc (id) {
      this.$router.push( {name: 'goodsesc', params:{id} });
    },
    goComment (id) {
      this.$router.push( {name: 'goodscomment', params:{id} });
    },
    addToShopCar () {
      // 添加购物车
      this.ballFlag = !this.ballFlag
    },
    beforeEnter (el) {
      el.style.transform = 'translate(0, 0)';
    },
    enter (el, done) {
      el.offsetWidth;

      // 小球动画优化思路：
      // 小球动画不准确的本质原因是，把小球的最终位置固定住了，导致在其他分辨率下，滚条滚动后，位置出现不准确
      // 因此，我们不要把 位置的 横纵坐标写固定，而应该根据不同情况，动态计算坐标值
      // 经过分析，得出解题思路：先得到徽标 的横纵坐标，再得到小球的横纵坐标，
      // 然后让 y值求差，x值也求差，得到的结果，就是横纵坐标要位移的距离
      // 如何获得 徽标 和 小球的 位置？？  domObject.getBoundingClientRect()

      // 获取小球在页面的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取徽标的位置 因为再父组件里，所以不能通过 this.$refs 获取
      const badgePosition = document.getElementById('badge').getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = 'all .5s cubic-bezier(.4,-0.3,1,.68)';

      done(); // 当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调,可以理解为after-enter的引用
    },
    afterEnter (el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount (count) {
      // 当子组件把选中的数量传递给父组件的时候，将数量保存到父组件的 selectedCount中
      this.selectedCount = count;
      // console.log(this.selectedCount+'获得值');
      
    }
  },
  components: {
    swiper,
    numberbox
  }
}
</script>

<style lang="scss" scoped>
  .goodsinfo-container {
    padding-top: 10px;
    background-color: #eee;
    overflow: hidden;

    .now_price {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
    .mui-card-footer {
      display: block;
      button {
        margin: 15px 0;
      }
    }
    .ball {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      z-index: 99;
      top: 45%;
      left: 40%;
      // transform: translate(88px,226px);
    }
  }
</style>