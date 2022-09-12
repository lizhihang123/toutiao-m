<!--
 * @Date: 2022-01-08 11:26:53
 * @LastEditTime: 2022-09-12 12:04:30
-->
<template>
  <div id="app">
    <!-- 切记 路由出口文件不能删去 -->
    <!-- 使得keep-alive 从文章详情 -> 返回到首页 不会再次进行页面的刷新
         1. 这里的生命周期的变化 记得准备好
         2. keep-alive有哪些缺点 也要准备好
     -->
    <keep-alive :exclude="['SearchResults', 'ArticleIndex', 'profile']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  deactivated() {
    // console.log(document.getElementById("demo"));
    // 离开页面之前将高度存储到sessionStorage。这里不建议用localStorage，因为session在关闭浏览器时会自动清除，而local则需要手动清除，有点麻烦。
    // sessionStorage.setItem(
    //   "scrollH",
    //   document.getElementById("demo") &&
    //     document.getElementById("demo").scrollTop
    // );
  },

  activated() {
    // 在activated生命周期内，从sessionStorage中读取高度值并设置到dom
    // if (
    //   sessionStorage.getItem("scrollH") &&
    //   document.getElementById("demo").scrollTop
    // ) {
    //   document.getElementById("demo").scrollTop =
    //     sessionStorage.getItem("scrollH");
    // }
  },
};
</script>

<style lang="less" scoped></style>
