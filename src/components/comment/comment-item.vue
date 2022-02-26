<!--
 * @Date: 2022-01-22 09:53:43
 * @LastEditTime: 2022-01-22 19:09:00
-->
<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        @click="Good"
        :loading="loading"
        :icon="comment.like_count ? 'good-job' : 'good-job-o'"
        :class="{ liked: comment.is_liking }"
        >{{ comment.like_count || "赞" }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('upload-pop', comment)"
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
// 导入 点赞 和 取消点赞的API
import { addCommentLikeAPI, deleteCommentLikeAPI } from "@/api";
export default {
  name: "CommentItem",
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false // 加载状态
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async Good() {
      this.loading = true; // 加载状态设置为true
      try {
        if (this.comment.is_liking) {
          // 点过赞 想 取消点赞
          // comment.aut_id是 评论或者回复的用户id 注意和用户的id区分开来s
          await deleteCommentLikeAPI(this.comment.com_id);
          this.comment.like_count--;
        } else {
          // 没点过赞 增加点赞
          await addCommentLikeAPI(this.comment.com_id);
          this.comment.like_count++;
        }
        this.comment.is_liking = !this.comment.is_liking;
      } catch (err) {
        this.$toast.fail("请求错误，请稍后重试");
      }
      this.loading = false; // 加载状态设置为false
    }
  }
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .liked {
    color: #e5645f !important;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
