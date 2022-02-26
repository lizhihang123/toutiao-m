/*
 * @Date: 2022-01-10 09:01:16
 * @LastEditTime: 2022-01-25 18:06:47
 */
import request from "@/utils/request.js";
// import store from "@/store";
// 用户登录
export const login = (data) =>
  request({
    url: "/v1_0/authorizations",
    method: "POST",
    data,
  });

// 发送验证码
export const sendSms = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: "GET",
  });

// 获取用户的信息
export const getUserInfo = () =>
  request({
    url: "/v1_0/user",
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  });

// 获取用户的频道列表信息
export const loadUserChannel = () =>
  request({
    url: "/v1_0/user/channels",
    method: "GET",
  });

// 添加用户关注
export const addFollow = (target) =>
  request({
    url: "/v1_0/user/followings",
    method: "POST",
    data: {
      target,
    },
  });
// 取消用户关注
export const deleteFollow = (target) =>
  request({
    url: `/v1_0/user/followings/${target}`,
    method: "DELETE",
  });

/*
用户资料获取
*/
// 获取用户资料
export const getUserProfile = (target) =>
  request({
    url: "/v1_0/user/profile",
    method: "GET",
  });

// 修改姓名
export const changeUserProfile = (data) =>
  request({
    url: "/v1_0/user/profile",
    method: "PATCH",
    data,
  });

// 修改头像
export const changePhoto = (data) =>
  request({
    url: "/v1_0/user/photo",
    method: "PATCH",
    data,
  });
