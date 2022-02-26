/*
 * @Date: 2022-01-20 10:02:35
 * @LastEditTime: 2022-01-22 09:26:21
 */
import request from "@/utils/request.js";
// 获取文章信息
export const getArticleById = (articleId) =>
  request({
    url: `/v1_0/articles/${articleId}`,
    method: "GET",
  });

// 收藏文章
export const addCollect = (target) =>
  request({
    url: "/v1_0/article/collections",
    method: "POST",
    data: {
      target,
    },
  });

// 取消收藏文章
export const deleteCollect = (target) =>
  request({
    url: `/v1_0/article/collections/${target}`,
    method: "DELETE",
  });

// 点赞文章
export const addLike = (target) =>
  request({
    url: "/v1_0/article/likings",
    method: "POST",
    data: {
      target,
    },
  });

// 取消点赞文章
export const deleteLike = (target) =>
  request({
    url: `/v1_0/article/likings/${target}`,
    method: "DELETE",
  });
