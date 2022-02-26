/*
 * @Date: 2022-01-18 11:34:19
 * @LastEditTime: 2022-01-19 10:59:31
 */
import request from "@/utils/request.js";
// 获取用户的联想建议
export const getSearchSuggestion = (q) =>
  request({
    url: "/v1_0/suggestion",
    method: "GET",
    params: {
      q,
    },
  });

// 获取用户的搜索结果
export const getSearchResult = (params) =>
  request({
    url: "/v1_0/search",
    method: "GET",
    params,
  });
