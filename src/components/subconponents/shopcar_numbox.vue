<template>
  <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
  <!-- 父组件什么时候把事件传给子组件？？ -->

</template>

<script>
import mui from '../../lib/mui/js/mui.js';
export default {
  mounted () {
    // 需要初始化数字选择框才能让点击按钮能点击
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged () {
      // 数量改变了
      // 每当数量改变时，则立即把最新的数量同步到购物车的 store 中，覆盖之前的数量值
      this.$store.commit('updateGoodsInfo', { id: this.goodsid, count: this.$refs.numbox.value })

    }
  },
  props: ["initcount", "goodsid"]
}
</script>

<style lang="scss">
  
</style>