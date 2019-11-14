<template>
  <div class="shopcar-container">
    <!-- 商品列表项目区 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <!-- 选择按钮 -->
						<mt-switch 
            v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChange(item.id, $store.getters.getGoodsSelected[item.id])"
            >
            </mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 如何从购物车中获取商品的数量？ -->
                <!-- 1. 我们可先创建一个 空对象，然后循环购物车中所有商品的数据，把 当前循环商品的id
                作为对象 属性名， count值作为 对象的属性值，这样，当把所有的商品都循环一遍，就会得到一个对象：
                {{ 88: 2, 89: 1 }} -->
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
					</div>
				</div>
			</div>
    </div>

    <!-- 结算区 -->
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品<span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件，总价<span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>



      <p>{{ $store.getters.getGoodsSelected }}</p>
  </div>
</template>

<script>
import numbox from '../subconponents/shopcar_numbox.vue'
export default {
  data() {
    return {
      goodslist: []
    }
  },
  components: {
    numbox
  },
  created () {
    this.getGoodsList();
  },
  methods: {
    getGoodsList () {
      // 1. 获取 store 中所有商品的Id,然后拼接出一个 用逗号分隔的字符串
      let idArr = [];
      this.$store.state.car.forEach(element => {
        return idArr.push(element.id);
      });
      // 如果购物车中没有商品，则返回，不需要请求数据接口，否则会报错
      if (idArr.length <= 0) {
        return;
      }
      this.$http.get('api/goods/getshopcarlist/' + idArr.join(','))
      .then((result) => {
        if (result.body.status === 0) {
          this.goodslist = result.body.message;
          // console.log(result.body.message[0]);
          
        }
      })
    },
    remove (id, index) {
      // 点击删除，把商品从store中根据传递的Id删除，同时，
      // 把 当前组件中的goodslist中，对应要删除的那个商品，使用index删除
      this.goodslist.splice(index, 1); // 本地删除
      this.$store.commit('removeFromCar',id) // 删除store
    },
    selectedChange (id, val) {
      // console.log(id +'---'+val);
      this.$store.commit('updateSelected', { id: id, selected: val });
    }
  }
}
</script>

<style lang="scss">
  .shopcar-container {
    background-color: #eee;
    overflow: hidden;
    .goods-list {
      .mui-card-content-inner {
        display: flex;
        align-items: center;
      }
      img {
        width: 50px;
        height: 50px;
        background-color: red;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h1 {
          font-size: 13px;
        }
        .price {
          color: red;
          font-weight: bold;
        }
      }
    }
    .jiesuan {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
</style>
