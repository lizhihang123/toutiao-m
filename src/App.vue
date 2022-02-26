<!--
 * @Date: 2022-01-08 11:26:53
 * @LastEditTime: 2022-01-15 15:30:47
-->
<template>
  <div id="app">
    <!-- 切记 路由出口文件不能删去 -->
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
  methods: {}
};
</script>

<style lang="less" scoped></style>
