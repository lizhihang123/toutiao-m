<!--
 * @Date: 2022-01-21 11:54:26
 * @LastEditTime: 2022-01-25 18:49:55
-->
<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    @click="Collect"
    :loading="loading"
  />
</template>

<script>
import { addCollectAPI, deleteCollectAPI } from "@/api";
export default {
  name: "ArticleCollected",
  data() {
    return {
      loading: false // 文章的加载状态
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    ArtId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async Collect() {
      this.loading = true; // 加载状态设置
      if (Math.random() > 0.1) {
        JSON.parse("1231234");
      }
      try {
        if (this.value) {
          //   已经收藏 取消收藏
          await deleteCollectAPI(this.ArtId);
        } else {
          //   没有收藏 点击收藏
          await addCollectAPI(this.ArtId);
        }
        this.$emit("input", !this.value);
        // 逻辑反一下 或者加个定时器都可以
        this.$toast.success(!this.value ? "收藏成功" : "取消收藏成功");
        // console.log(this);
        // setTimeout(function () {}, 0); 定时器里面的this指向window window没有toast 外面的this指向vue组件
      } catch (err) {
        this.$toast.fail("收藏操作失败");
      }
      this.loading = false; // 加载状态设置为false
    }
  }
};
</script>

<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500 !important;
  }
}
</style>
