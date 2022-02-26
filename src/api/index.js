/*
 * @Date: 2022-01-10 09:04:13
 * @LastEditTime: 2022-01-25 18:07:20
 */
// 登录 验证码 用户信息获取 指定用户频道的API 关注用户 和 取消关注用户
import {
  login,
  sendSms,
  getUserInfo,
  loadUserChannel,
  addFollow,
  deleteFollow,
  getUserProfile, // 获取用户个人资料
  changeUserProfile, // 改变用户的昵称
  changePhoto, // 修改头像
} from "./user.js";
// 获取新闻内容API
import { GetNewsContent } from "./home.js";
// 所有频道API 存储用户频道 删除用户频道API
import {
  getAllChannels,
  storeUserChannels,
  deleteUserChannels,
} from "./channel.js";
// 搜索联想记忆API 获取用户的搜索结果
import { getSearchSuggestion, getSearchResult } from "./search.js";
// 获取文章详情 收藏文章 取消收藏文章
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike, // 点赞
  deleteLike, // 取消点赞
} from "./article.js";
import {
  getComment,
  addCommentLike,
  deleteCommentLike,
  addArticleComment,
} from "./comment";

export const loginAPI = login;
export const sendSmsAPI = sendSms;
export const getUserInfoAPI = getUserInfo;
export const loadUserChannelAPI = loadUserChannel;
export const GetNewsContentAPI = GetNewsContent;
export const getAllChannelsAPI = getAllChannels;
export const storeUserChannelsAPI = storeUserChannels;
export const deleteUserChannelsAPI = deleteUserChannels;
export const getSearchSuggestionAPI = getSearchSuggestion;
export const getSearchResultAPI = getSearchResult;
export const getArticleByIdAPI = getArticleById;
export const addFollowAPI = addFollow;
export const deleteFollowAPI = deleteFollow;
export const addCollectAPI = addCollect;
export const deleteCollectAPI = deleteCollect;
export const addLikeAPI = addLike;
export const deleteLikeAPI = deleteLike;
export const getCommentAPI = getComment;
export const addCommentLikeAPI = addCommentLike;
export const deleteCommentLikeAPI = deleteCommentLike;
export const addArticleCommentAPI = addArticleComment;
export const getUserProfileAPI = getUserProfile;
export const changeUserProfileAPI = changeUserProfile;
export const changePhotoAPI = changePhoto;
