/*
 * @Date: 2022-01-08 11:26:53
 * @LastEditTime: 2022-01-09 09:31:13
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
import Vant from "vant";
import "vant/lib/index.css";

// 引入 amfe-flexible 包 配置 不同页面的根标签 为宽度 1/10
import "amfe-flexible";

Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
