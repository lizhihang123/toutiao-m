<!--
 * @Date: 2022-01-17 18:04:13
 * @LastEditTime: 2022-01-22 10:25:57
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
// 引入防抖函数
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      searchList: [], // 搜索 联想记忆 数组
      timer: null
    };
  },
  props: {
    SearchText: {
      type: String,
      required: true
    }
  },
  watch: {
    SearchText: {
      // 原始侦听器
      // handler: function (value) {
      //   let timer = null;
      //   if (timer) clearTimeout(timer);
      //   timer = setTimeout(function () {
      //     this.loadSearchSuggestion(value); // this 打印是window 而下面的this打印的是vue组件
      //   }, 500);
      // },
      // 原始侦听器
      // handler(value) {
      //   if (this.timer) clearTimeout(this.timer);
      //   this.timer = setTimeout(function () {
      //     this.loadSearchSuggestion(value);
      //   }, 400);
      // },
      // 用debounce防抖的侦听器
      handler: debounce(
        function (value) {
          this.loadSearchSuggestion(value);
        },
        200
        // 默认 leading -》 false ; trailing -> true 延时结束后调用而不是开始前
        // {
        //   leading: true, 延时开始前调用
        //   trailing: false 延时结束后调用 - > false就是延时开始前调用
        // }
      ),

      // 没有用防抖的 侦听器
      // handler(value) {
      //   console.log(value); // 打印数据是最新的
      //   this.loadSearchSuggestion(value);
      // },
      immediate: true // 页面一刷新 就会打印这个数据 不然第一次数据获取不到
    }
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
    }
  }
};
</script>

<style lang="less" scoped>
.suggestion-container {
  /deep/.active {
    color: #3296fa;
  }
}
</style>
