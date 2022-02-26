<!--
 * @Date: 2022-01-17 18:03:06
 * @LastEditTime: 2022-01-19 13:14:32
-->
<template>
  <div class="search-results">
    <!-- 3. 搜索结果 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
// 获取数据处理结果
import { getSearchResultAPI } from "@/api";
export default {
  name: "SearchResults",
  data() {
    return {
      list: [], // 列表的数据
      finished: false, // 数据加载完毕 手动 finished -> true
      loading: false, // 滚动到底部 内部自动 loading -> true 若数据加载完毕，手动 loading -> false
      page: 1, // 当前的页码
      perpage: 10, // 每页的数据数量
      error: false // 是否出现错误提示 初始为false
    };
  },
  props: {
    SearchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad() {
      try {
        // 1. 请求数据
        const { data } = await getSearchResultAPI({
          page: this.page, // 当前的页码
          perpage: this.perpage, // 每页的数据是多少
          q: this.SearchText // 搜索传入后台的关键词
        });
        // 2. 数据赋值给数组 数据渲染
        const results = data.data.results;
        this.list.push(...results);
        // 3. 停止加载数据
        this.loading = false;
        // 4. 判断是否还有数据
        if (results.length) {
          // 有 页面的页码++
          this.page++; // 一个页面数据加载完成滚动到底部，第三步停止，第四步如果还有数据，页码+1，重新触发load事件
        } else {
          //  没有数据 finished改为true  意思不是加载错误
          this.finished = true; // 停止加载数据 数据全部加载完毕
        }
      } catch (err) {
        // 这里是加载错误
        this.error = true; // 开启错误提示
        this.loading = false; // 加载状态停止 点击错误提示 重新触发load事件
      }
    }
  }
};
</script>

<style></style>
