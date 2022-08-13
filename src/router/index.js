/*
 * @Date: 2022-01-08 11:26:53
 * @LastEditTime: 2022-08-07 14:13:52
 */
import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "@/views/login/index.vue";
// import Home from "@/views/home/index.vue";
// import Qa from "@/views/qa/index.vue";
// import Video from "@/views/video/index.vue";
// import My from "@/views/my/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/", // 默认路由
    // name: "layout",
    component: () => import("@/views/layout/index.vue"),
    meta: {
      keepalive: true, // 需要做缓存
    },
    children: [
      {
        path: "", // 默认子路由
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          keepalive: true, // 需要做缓存
        },
      },
      {
        path: "qa",
        name: "qa",
        component: () => import("@/views/qa/index.vue"),
        meta: {
          keepalive: true, // 需要做缓存
        },
      },
      {
        path: "video",
        name: "video",
        component: () => import("@/views/video/index.vue"),
        meta: {
          keepalive: true, // 需要做缓存
        },
      },
      {
        path: "my",
        name: "my",
        component: () => import("@/views/my/index.vue"),
        meta: {
          keepalive: true, // 需要做缓存
        },
      },
    ],
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/index.vue"),
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: () => import("@/views/article/index.vue"),
    props: true,
    // 这里设置props的目的是，开启路由传参 为什么要路由传参？
    // 第一，减少访问参数的难度，直接props获取，无需 this.$router.articleId
    // 第二，其他组件使用id，直接通过组件通信传递这个参数 实现路由解耦 【耦合性：模块之间的依赖，减少模块之间的依赖】【内聚： 内部的依赖】
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/profile/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
