/*
 * @Date: 2022-01-09 11:25:11
 * @LastEditTime: 2022-08-08 14:12:31
 */
import axios from "axios";
import store from "@/store/index.js";
import JSONBig from "json-bigint";
// axios.defaults.baseURL = "http://toutiao.itheima.net";

const request = axios.create({
  baseURL: "http://toutiao.itheima.net",

  // 自定义修改后端返回数据 在数据 交给 catch或者then之前
  transformResponse: [
    function (data) {
      // 对 data 进行任意转换处理
      // 1. 这样能够处理 超出整数范围的数据
      try {
        return JSONBig.parse(data);
      } catch (err) {
        return data;
      }

      // 2. 默认处理后端数据 JSON.parse
      // return JSON.parse(data);
      // return data;
    },
  ],
});
// var json = '{ "id": 9007199254740995, "name": "Jack", "age": 18 }';
// console.log(JSON.parse(json)); // 9007199254740996 精度不准确
// console.log(JSONBig.parse(json)); // 是个对象
// console.log(JSONBig.parse(json).id); // 还是一个对象
// console.log(JSONBig.parse(json).id.toString()); // 转化为字符串使用 // 满足我们你的需要

// console.log(JSON.stringify(JSON.parse(json))); // 精度可能不对
// console.log(JSONBig.stringify(JSON.parse(json))); // 精度更好准确 数据类型注意
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state;
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    // console.log(config);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 响应拦截器
export default request;
