<!--
 * @Date: 2022-01-17 17:25:04
 * @LastEditTime: 2022-01-19 19:05:01
-->
<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-results v-if="isResultShow" :SearchText="searchText" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      @search="onSearch"
      v-else-if="searchText"
      :SearchText="searchText"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史 -->
    <search-history
      v-else
      :searchHistoryList="searchHistoryList"
      @clear-hisroty-all="searchHistoryList = []"
      @search="onSearch"
    />
    <!-- /搜索历史 -->
  </div>
</template>

<script>
// 1. 没有内容 搜索历史出现
// 2. 有内容 联想建议出现
// 3. 有内容敲回车 搜索结果出现
// 4. 有内容 点击 focus 搜索框 联想建议出现
import SearchHistory from "./components/search-history.vue";
import SearchResults from "./components/search-results.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
// 导入 本地存储 存数据 拿数据方法
import { setItem, getItem } from "@/utils/storage.js";
export default {
  name: "searchIndex",
  data() {
    return {
      value: "",
      searchText: "", // 搜索框 v-model 内容绑定
      isResultShow: false, // 搜索历史是否出现
      searchHistoryList: getItem("TOUTIAO_SEARCH_HISROTY") || [] // 搜索历史记录
    };
  },
  components: {
    SearchHistory,
    SearchResults,
    SearchSuggestion
  },
  methods: {
    onSearch(val) {
      // console.log(val);
      // 1. 点击联想建议的值或者敲回车 搜索框的值改变
      this.searchText = val;

      // 2. 搜索历史数据【两类：敲回车，点击联想建议cell的值】 存储到 列表
      const index = this.searchHistoryList.indexOf(val);
      if (index !== -1) {
        // 如果搜索历史记录里面有这个值，删除以前的
        this.searchHistoryList.splice(index, 1);
      }
      //  添加最新的，最新搜索的放在开头 unshift
      this.searchHistoryList.unshift(val);
      // 3. 搜索结果展示
      this.isResultShow = true;
    },
    onCancel() {
      // console.log("cancel");
      this.$router.back();
    }
  },
  watch: {
    searchHistoryList(val) {
      // this.searchHistoryList.unshift(this.searchText);
      setItem("TOUTIAO_SEARCH_HISROTY", val); // val的值就是searchHistoryList数组的值 每次搜索，都会往里面添加值
    }
    // handler: {
    //   searchHistoryList() {
    //   }
    // }
  }
};
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
