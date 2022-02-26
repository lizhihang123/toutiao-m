/*
 * @Date: 2022-01-08 11:26:53
 * @LastEditTime: 2022-01-10 21:03:13
 */
import Vue from "vue";
import Vuex from "vuex";
import { getItem, setItem } from "@/utils/storage.js";

Vue.use(Vuex);

// 声明一个常量 存储 item
const TOKEN_USER = "";
// 1. 项目容器
export default new Vuex.Store({
  state: {
    // 字符串 -》 JSON对象
    user: getItem(TOKEN_USER),
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      // 对象 -》 JSON字符串
      setItem(TOKEN_USER, data);
    },
  },
  actions: {},
  modules: {},
});
