<!--
 * @Date: 2022-01-22 18:48:31
 * @LastEditTime: 2022-01-24 08:24:26
-->
<template>
  <div style="padding-top: 92px" class="reply-container">
    <!-- 头部 部分 -->
    <van-nav-bar
      class="nav-tab-btn"
      :title="`${comment.reply_count}条回复`"
      fixed
    >
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('uploadPop', false)"
      ></van-icon>
    </van-nav-bar>
    <!-- /头部 部分 -->

    <!-- 滚动区域 -->
    <div class="scroll-comment">
      <!-- 当前评论部分 -->
      <comment-item :comment="comment" />
      <!-- /当前评论部分 -->

      <van-cell title="评论的回复" />

      <!-- 评论回复部分 -->
      <comment-list :source="comment.com_id" type="c" :list="commentList" />
      <!-- /评论回复部分 -->
    </div>

    <!-- 发布评论 -->
    <div class="post-comment">
      <van-button size="max" round class="post-btn" @click="isReplyShowT = true"
        >发评论</van-button
      >
    </div>
    <!-- /发布评论 -->

    <!-- 发布评论弹框 -->
    <van-popup v-model="isReplyShowT" position="bottom">
      <!-- 给发帖的组件 传递target->评论的id 文章id -->
      <comment-post
        :target="comment.com_id"
        :ArtId="articleId"
        @success-publish="updateComment"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "@/components/comment/comment-item.vue";
import CommentList from "./comment-list.vue";
import CommentPost from "./comment-post.vue";
export default {
  name: "CommentReply",
  data() {
    return {
      isReplyShowT: false, // 回复评论的弹框
      commentList: [] // 评论的数据数量
    };
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  methods: {
    updateComment(value) {
      // 更新评论的数量
      this.comment.reply_count++;
      // 关闭弹层
      this.isReplyShowT = false;
      // 数据放到评论的顶部
      this.commentList.unshift(value.new_obj);
    }
  }
};
</script>

<style lang="less" scoped>
.reply-container {
  .nav-tab-btn {
    background-color: #fff;
    /deep/.van-nav-bar__title {
      color: #000;
    }
    /deep/.van-icon {
      color: #2c7de8 !important;
    }
  }
  // 评论滚动的区域
  .scroll-comment {
    position: fixed;
    top: 92px;
    bottom: 88px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  // 底部区域
  .post-comment {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88px;
    background-color: #ffffff;
    // 底部的按钮区域
    .post-btn {
      width: 60%;
    }
  }
}
</style>
