/*
 * @Date: 2022-01-15 15:38:38
 * @LastEditTime: 2022-01-15 19:59:12
 */
// 引入vue
import Vue from "vue";
// 加载包
import dayjs from "dayjs";
// 导入语言包
import "dayjs/locale/zh-cn.js";

// 引入 dayjs插件

// 获取当前时间 格式化 引入相对时间源码
import relativeTime from "dayjs/plugin/relativeTime";
// 使用语言包
dayjs.locale("zh-cn");
// 使用插件dayjs
dayjs.extend(relativeTime);
// console.log(dayjs().format("YYYY-MM-DD")); // 2022-01-15
// console.log(dayjs("1979").fromNow()); //  43 years ago 这两个语句 必须写在extend下面
// console.log(dayjs("1970").fromNow()); //  52 years ago 这两个语句 必须写在extend下面
// console.log(dayjs().from(dayjs("1990"))); // in 32 years
// console.log(dayjs().to(dayjs("1990"))); // 32 years ago
// console.log(dayjs("1990").toNow()); // in 32 years

Vue.filter("relativeTime", (value) => {
  return dayjs(value).fromNow();
});
