/*
 * @Date: 2022-01-09 11:25:11
 * @LastEditTime: 2022-08-13 19:37:37
 */
import axios from "axios";
import store from "@/store/index.js";
import JSONBig from "json-bigint";
import router from '@/router'
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

request.interceptors.response.use(
  function(response) {
    // 1. 请求成功 进入的回调函数
    // 2xx状态码范围内的状态码都会触发该函数
    return response
  },
  // 2. 请求失败 进入的回调函数
  async function(error) {
    //    打印失败的信息
    //    超出2XX范围的状态码都会触发该函数
    console.dir(error);

    // 如果有返回respone信息 并且响应信息的state的值是401 就return 不要执行 跳转到登录页面
    // 401 状态码一般用于表示用户的信息认证
    if (error.response && error.response.status === 401) {
      const user = store.state.user

      if (!user || !user.refresh_token) {
        router.push('/login')
        return
      }
      try {
        // 如果有refresh_token 就请求获取新的token值
        // 再次封装一个函数 调另一个接口 旧token -> 换新的token 如果token刷新时间也过期了 就跳转到router页面
        const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        console.log(res, 'res是失败的信息');

        // 把信息存储到vuex
        store.commit('setUser', {
          token: res.data.data.token, // 最新的token值
          refresh_token: user.refresh_token // 还是原来的refresh_token值
        })
        // request能够把之前失败的请求再次发送出去，
        // error.config包含之前发送失败的 method url的信息
        return request(error.config)
      } catch (error) {
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
);

export default request;
