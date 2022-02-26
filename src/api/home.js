/*
 * @Date: 2022-01-14 14:31:22
 * @LastEditTime: 2022-01-18 09:43:10
 */
// 获取用户文章 新闻推荐信息
import request from "@/utils/request.js";
export const GetNewsContent = (params) =>
  request({
    url: "/v1_0/articles",
    method: "GET",
    // 简写
    // params:params
    params,
  });
