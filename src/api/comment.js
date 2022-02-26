/*
 * @Date: 2022-01-22 09:26:29
 * @LastEditTime: 2022-01-22 14:23:49
 */
// 评论API
import request from "@/utils/request.js";
// 对文章或者评论 进行评论
export const getComment = (params) =>
  request({
    url: "/v1_0/comments",
    method: "GET",
    params,
  });

// 点赞评论
export const addCommentLike = (target) =>
  request({
    url: "/v1_0/comment/likings",
    method: "POST",
    data: {
      target,
    },
  });

// 取消点赞评论
export const deleteCommentLike = (target) =>
  request({
    url: `/v1_0/comment/likings/${target}`,
    method: "DELETE",
  });

// 评论文章
export const addArticleComment = (data) =>
  request({
    url: "/v1_0/comments/",
    method: "POST",
    data,
  });
