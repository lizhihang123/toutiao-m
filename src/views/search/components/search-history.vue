<!--
 * @Date: 2022-01-17 18:02:22
 * @LastEditTime: 2022-01-19 15:34:56
-->
<template>
  <div class="history-container">
    <!-- 1. 搜索历史标题 -->
    <van-cell title="搜索历史" value="内容">
      <div v-if="isDeleteShow">
        <span style="margin-right: 5px" @click="$emit('clear-hisroty-all')"
          >全部删除</span
        >
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <!-- 搜索历史内容 -->
    <van-cell
      :title="str"
      v-for="(str, index) in searchHistoryList"
      :key="index"
      @click="deleteHistoriy(str, index)"
    >
      <van-icon name="close" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  data() {
    return {
      isDeleteShow: false // 控制 删除功能相关的显示 隐藏
    };
  },
  props: {
    searchHistoryList: {
      type: Array,
      required: true
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    // 删除历史数据
    deleteHistoriy(str, index) {
      if (this.isDeleteShow) {
        this.searchHistoryList.splice(index, 1);
      } else {
        // 触发Search事件执行onSearch函数 显示搜索结果
        this.$emit("search", str);
      }
    }
  }
};
</script>

<style></style>
