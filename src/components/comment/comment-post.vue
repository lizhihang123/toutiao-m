<!--
 * @Date: 2022-01-22 14:09:58
 * @LastEditTime: 2022-01-26 20:05:56
-->
<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <!-- 禁用按钮 没信息 就禁用 -->
    <van-button class="post-btn" @click="addComment" :disabled="!message"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addArticleCommentAPI } from "@/api";
export default {
  name: "CommentPost",
  components: {},
  props: {
    ArtId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      message: "" // 发布的内容
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 发布评论
    async addComment() {
      try {
        const { data } = await addArticleCommentAPI({
          target: this.ArtId.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 发布评论的内容
          art_id: this.ArtId.toString() || null // 文章id，对评论内容发表回复时，需要传递此参数，。对文章进行评论，不要传此参数。
        });
        console.log(data);
        // 1. 评论内容清空
        this.message = "";
        // 2. 关闭弹出层
        // 3. 新增评论 放到评论区域的首位
        this.$emit("success-publish", data.data);
        console.log(data.data);
      } catch (err) {
        this.$toast.fail("发布评论失败，请稍后重试");
      }
    }
  }
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
