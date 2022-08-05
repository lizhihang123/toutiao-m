<!--
 * @Date: 2022-01-08 11:26:53
 * @LastEditTime: 2022-08-05 16:03:18
-->
<template>
  <div id="app">
    <!-- 切记 路由出口文件不能删去 -->
    <!-- 使得keep-alive 从文章详情 -> 返回到首页 不会再次进行页面的刷新
         1. 这里的生命周期的变化 记得准备好
         2. keep-alive有哪些缺点 也要准备好
     -->
    <keep-alive>
      <router-view v-if="$route.meta.keepalive" ref="demo"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
