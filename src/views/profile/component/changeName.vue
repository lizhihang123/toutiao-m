<!--
 * @Date: 2022-01-24 19:29:28
 * @LastEditTime: 2022-01-25 09:24:37
-->
<template>
  <div class="changeName-container">
    <!-- 头部 -->
    <van-nav-bar
      class="nav-tab"
      title="修改昵称"
      fixed
      left-text="返回"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    >
    </van-nav-bar>
    <!-- 输入框 -->
    <van-field
      v-model="localName"
      rows="1"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
// 改变姓名
import { changeUserProfileAPI } from "@/api";
export default {
  name: "changeName",
  data() {
    return {
      localName: this.name
    };
  },
  props: {
    //   用户的初始昵称
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "加载中",
        duration: 0, // 表示没有加载好 不会停止
        forbidClick: true // 是否禁止背景点击
      });
      try {
        const localName = this.localName;
        if (!localName) {
          this.$toast.fail("更新的数据不能为空");
          return;
        }
        const res = await changeUserProfileAPI({ name: localName });
        console.log(res);
        // data里面的data是null为啥？
        // 更新视图数据
        this.$emit("upload-name", localName);

        // 关闭弹框
        this.$emit("close");

        // 提示成功
        this.$toast.success("请求成功");
      } catch (err) {
        this.$toast.fail("更新失败");
      }
    }
  }
};
</script>

<style scoped lang="less">
.changeName-container {
  padding-top: 92px;
  .van-nav-bar {
    .van-field {
      border-bottom: 1px solid #000;
      background-color: #eee;
    }
  }
}
</style>
