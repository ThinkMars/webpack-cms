<template>
<!-- 我们可以使用 watch 属性侦听父组件传递过来的max值，不管watch触发几次，但是最后一次，绝对是一个合法的 max 值 -->
  <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
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
      // 每当文本框里的数值变动时，就把数据传给父组件
      // console.log(this.$refs.numbox.value);
      this.$emit('getCount', parseInt(this.$refs.numbox.value));
      
    }
  },
  props: ['max'],
  watch: {
    // 属性侦听
    // 动态侦听max属性，一旦max属性发生变化，就会执行函数。函数API参考MUI文档的numberbox
    'max': (newVal, oldVal) => {
      mui('.mui-numbox').numbox().setOption('max',newVal);
    }
  }
}
</script>

<style lang="scss">
  
</style>