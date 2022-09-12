<!--
 * @Date: 2022-01-17 18:04:13
 * @LastEditTime: 2022-08-23 13:57:09
-->
<template>
  <div class="suggestion-container">
    <!-- 2. 联想记忆 -->
    <!-- 2.1 v-for遍历数据 -->
    <van-cell
      v-for="(text, index) in searchList"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <span v-html="highlight(text)" slot="title"></span>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionAPI } from "@/api";
// import { debounce } from "@/utils/common.js";
// 引入防抖函数
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      searchList: [], // 搜索 联想记忆 数组
      timer: null,
    };
  },
  props: {
    SearchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    // 获取 联想建议 数据
    async loadSearchSuggestion(value) {
      const { data } = await getSearchSuggestionAPI(value);
      this.searchList = data.data.options;
    },

    // 用户高亮函数设置
    highlight(text) {
      if (text) {
        const htmlStr = `<span class='active'>${this.SearchText}</span>`;
        var reg = new RegExp(this.SearchText, "gi");
        return text.replace(reg, htmlStr);
      }
    },
  },
  watch: {
    SearchText: {
      handler: debounce(
        function (newVal, oldVal) {
          this.loadSearchSuggestion(newVal);
        },
        1000,
        {
          leading: true, // 这个和下面的必须配合使用 // 一触发就调用
          trailing: false,
        }
      ),
      immediate: true,
      // 默认 leading -》 false ; trailing -> true 延时结束后调用而不是开始前
      // {
      //   leading: true, 延时开始前调用
      //   trailing: false 延时结束后调用 - > false就是延时开始前调用
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.suggestion-container {
  /deep/.active {
    color: #3296fa;
  }
}
</style>
