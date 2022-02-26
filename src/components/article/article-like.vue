<!--
 * @Date: 2022-01-21 14:00:29
 * @LastEditTime: 2022-01-21 14:30:26
-->
<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{ liked: value === 1 }"
    @click="Collect"
    :loading="loading"
  />
</template>

<script>
import { addLikeAPI, deleteLikeAPI } from "@/api";
export default {
  data() {
    return {
      loading: false, // 加载状态
      status: 0 // 点赞按钮的状态
    };
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    ArtId: {
      type: [Number, String, Object],
      required: true
    }
  },

  methods: {
    async Collect() {
      this.loading = true;
      try {
        if (this.value === 1) {
          // 点赞成功中，点击取消点赞
          await deleteLikeAPI(this.ArtId);
          this.status = 0;
        } else {
          // 没有点赞，点击添加点赞
          await addLikeAPI(this.ArtId);
          this.status = 1;
        }
        this.$emit("input", this.status); // 子传父 关系到变量 -> 影响样式的设置
        this.$toast.success(this.value === 1 ? "点赞成功" : "取消点赞成功");
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.$toast.fail("操作失败，请重试");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
