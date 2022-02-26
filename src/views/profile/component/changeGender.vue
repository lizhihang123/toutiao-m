<!--
 * @Date: 2022-01-25 08:26:31
 * @LastEditTime: 2022-01-25 09:29:12
-->
<template>
  <div class="changeGender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { changeUserProfileAPI } from "@/api";
export default {
  name: "changeGender",
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value
    };
  },
  props: {
    value: {
      type: Number,
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
        const res = await changeUserProfileAPI({ gender: this.localGender });
        console.log(res);
        // data里面的data是null为啥？
        // 更新视图数据
        this.$emit("upload-gender", this.localGender);

        // 关闭弹框
        this.$emit("close");

        // 提示成功
        this.$toast.success("请求成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("更新失败");
      }
    },
    onChange(picker, value, index) {
      this.localGender = index;
    }
  }
};
</script>

<style></style>
