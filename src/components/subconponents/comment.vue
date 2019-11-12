<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容" maxlength="120"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, index) in comments" :key="index">
        <div class="cmt-title">
          第{{ index+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time|dataFormat }}
        </div>
        <div class="cmt-body">
          <p>{{ item.content === 'undefined'? '该用户很懒，没有任何评论' : item.content }}</p>
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      pageIndex: 1, // 页数索引
      comments: [] // 所有的评论数据
    }
  },
  created () {
    this.getComments();
  },
  methods: {
    getComments () {
      this.$http.get("api/getcomments/"+ this.id +"?pageindex=" + this.pageIndex)
      .then((data) => {
        if (data.body.status === 0) {
          // console.log(data.body);
          // this.comments = data.body.message;
          // 【关键点】每当获取新的评论时，不要清空原来的数据，而是用拼接的方式加入新的数据
          this.comments = this.comments.concat(data.body.message);
        }
      })
    },
    getMore () {
      this.pageIndex++;
      this.getComments();
    }
  },
  // 父子传值
  props: ["id"]
}
</script>

<style lang="scss" scoped>
  .cmt-container {
    h3 {
      font-size: 18px;
    }
    textarea {
      font-size: 14px;
      height: 85px;
      margin: 0;
    }
    .cmt-list {
      margin: 10px 0;
      .cmt-item {
        font-size: 13px;
        .cmt-title {
          line-height: 30px;
          background-color: #ccc;
        }
        .cmt-body {
          line-height: 35px;
          text-indent: 2em;
        }
      }
    }
  }
</style>
