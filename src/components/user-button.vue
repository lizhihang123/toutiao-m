<!--
 * @Date: 2022-01-20 20:06:31
 * @LastEditTime: 2022-01-21 14:16:12
-->
<template>
  <!-- 两个根节点 因为有v-if 其实还是只有一个根节点 -->
  <van-button
    class="follow-btn"
    round
    size="small"
    v-if="isFollowed"
    @click="Follow"
    :loading="loading"
    >已关注</van-button
  >
  <van-button
    v-else
    @click="Follow"
    class="follow-btn"
    type="badge"
    color="#3296fa"
    round
    size="small"
    :loading="loading"
    icon="plus"
    >关注</van-button
  >
</template>

<script>
import { addFollowAPI, deleteFollowAPI } from "@/api";
export default {
  name: "UserButton",
  data() {
    return {
      loading: false, // 控制按钮的加载状态
      message: "请求失败，请稍后再试" // 错误提示
    };
  },
  model: {
    prop: "isFollowed",
    event: "update-is_followed"
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    isAutId: {
      type: [Number, String, Object], // 作者的id 多类型 因为id可能是超出限制的,
      required: true
    }
  },
  methods: {
    // 添加或者删除 用户关注
    async Follow() {
      this.loading = true; // 点击按钮 显示加载状态
      try {
        if (this.isFollowed) {
          // 已经关注 但要设置为 非关注
          const res = await deleteFollowAPI(this.isAutId);
          console.log(res);
        } else {
          // 没有关注 要设置为关注
          const res = await addFollowAPI(this.isAutId);
          console.log(res);
        }
        this.$emit("update-is_followed", !this.isFollowed);
        // this.$emit("update:isAutId", 544);
        // this.isFollow = !this.isFollow;
        // 这是错的写法;
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 400) {
          this.message = "自己不能关注自己";
        }
        this.$toast.fail(this.message);
      }
      this.loading = false; // 点击按钮 显示加载状态
    }
  }
};
</script>

<style></style>
