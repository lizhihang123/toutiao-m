<!--
 * @Date: 2022-01-12 09:41:45
 * @LastEditTime: 2022-08-05 17:11:08
-->
<template>
  <div class="layout-container">
    <!-- 路由出口 -->
    <!-- 确认是路由写这里 -->
    <!-- <router-view ></router-view> -->

    <keep-alive>
      <router-view v-if="$route.meta.keepalive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"></router-view>

    <!-- https://www.jb51.net/article/179297.htm 路由缓存-->
    <!-- 底部tabbar -->
    <van-tabbar v-model="active" class="layout-tabbar" route>
      <!-- to属性 前面都要加斜杠 即便是默认的子路由也要加 -->
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin" to=""></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{ $store.state.user ? "我的" : "未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- /底部tabbar -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
    };
  },
  deactivated() {
    // 离开页面之前将高度存储到sessionStorage。这里不建议用localStorage，因为session在关闭浏览器时会自动清除，而local则需要手动清除，有点麻烦。
    sessionStorage.setItem(
      "scrollH",
      document.getElementById("demo") &&
        document.getElementById("demo").scrollTop
    );
  },

  activated() {
    // 在activated生命周期内，从sessionStorage中读取高度值并设置到dom
    if (
      sessionStorage.getItem("scrollH") &&
      document.getElementById("demo").scrollTop
    ) {
      document.getElementById("demo").scrollTop =
        sessionStorage.getItem("scrollH");
    }
  },
};
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
