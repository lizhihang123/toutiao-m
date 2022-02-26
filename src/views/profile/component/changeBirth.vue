<!--
 * @Date: 2022-01-25 13:23:05
 * @LastEditTime: 2022-01-25 14:02:39
-->
<template>
  <div class="birth-container">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onChange"
    />
  </div>
</template>

<script>
import { changeUserProfileAPI } from "@/api";
import dayjs from "dayjs";
export default {
  name: "changeBirth",
  data() {
    return {
      minDate: new Date(1980, 0, 1), // 最小的日期 月份0表示1月
      maxDate: new Date(2025, 10, 1), // 最大的日期
      currentDate: new Date(this.value) // 默认的日期 以及和选择框双向绑定 这里转化注意 日期格式
    };
  },
  props: {
    value: {
      // 日期格式
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
        // 后台要的是传入字符串 本地有的不是字符串 日期格式要转化字符串 dayjs().format('YYYY-MM-DD')
        const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
        await changeUserProfileAPI({
          birthday: currentDate // 字符串
        });
        console.log(dayjs(currentDate).format("YYYY-MM-DD")); // 字符串

        // data里面的data是null为啥？
        // 更新视图数据 字符串转化为日期格式
        this.$emit("input", currentDate);

        // 关闭弹框
        this.$emit("close");

        // 提示成功
        this.$toast.success("请求成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("更新失败");
      }
    }
  }
};
</script>

<style></style>
