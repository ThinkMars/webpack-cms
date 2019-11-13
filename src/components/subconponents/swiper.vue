<template>
  <div>
    <mt-swipe :auto="3000">
      <!-- 谁用轮播图组件，谁给组件传数据。此时，轮播图的数据应该是父组件向子组件传数据 -->
      <mt-swipe-item class="slide1" v-for="item in SwipePhotos" :key="item.url">
        <img :src="item.url" alt :class="{'full':isfull}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!-- 为什么轮播图里的图片这么丑 -->
  <!-- 分歧：设置高度为100%，宽度 为自适应还是100%？ -->
  <!-- 通过给img绑定class的方式，决定是否需要设置宽度100%，而宽度100%需要设置一个新的类 -->
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: ['SwipePhotos','isfull']
}
</script>

<style lang="scss">
  .mint-swipe {
  height: 200px;
  margin-top: 10px;

  // 嵌套写法

  .mint-swipe-item {
    // 图片居中
    text-align: center;
    // & 为交集选择器符号
    
    // &:nth-child(1) {
    //   background-color: red;
    // }
    // &:nth-child(2) {
    //   background-color: blue;
    // }
    // &:nth-child(3) {
    //   background-color: green;
    // }

    img {
      // width: 100%;
      height: 100%;
    }
  }
}

.full {
  width: 100%;
}
</style>