/*
 * @Date: 2022-01-08 11:26:53
 * @LastEditTime: 2022-01-09 14:20:06
 */
import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "@/views/login/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
