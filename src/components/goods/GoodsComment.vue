<template>
  <div class="goodscomment-container">
    <comment :id="this.$route.params.id"></comment>
  </div>
</template>

<script>
// 导入评论组件
import comment from '../subconponents/comment.vue'

export default {
  components: {
    comment
  }
}
</script>

<style lang="scss">
  .goodscomment-container {
    padding: 10px 5px 0;
  }
</style>