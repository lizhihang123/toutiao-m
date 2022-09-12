/*
 * @Date: 2022-01-08 11:26:53
 * @LastEditTime: 2022-08-29 16:40:41
 */
import './utils/console'
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
import Vant from "vant";
import "vant/lib/index.css";
// 引入滚动保存的js文件

import "@/utils/dayjs.js";

// 引入 amfe-flexible 包 配置 不同页面的根标签 为宽度 1/10
import "amfe-flexible";

Vue.use(Vant);
Vue.config.productionTip = false;

// 路由的导航守卫 前置
// Toast.success("登录成功"); 只有写在main.js里面才不用加this
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
