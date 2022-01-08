/*
 * @Date: 2022-01-08 11:26:53
 * @LastEditTime: 2022-01-08 15:33:42
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
