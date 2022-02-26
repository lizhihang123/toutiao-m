/*
 * @Date: 2022-01-16 14:13:06
 * @LastEditTime: 2022-01-17 11:20:17
 */
import request from "@/utils/request.js";
export const getAllChannels = () => {
  return request({
    url: "/v1_0/channels",
    method: "GET",
  });
};
// 保存登录状态 我的频道
export const storeUserChannels = (channel) => {
  return request({
    url: "/v1_0/user/channels",
    method: "PATCH",
    data: {
      channels: [channel], // channel是一个对象 里面有 id 和 seq两个属性 channel是这个属性名 -> 看文档
    },
  });
};

// 删除 登录状态 我的频道
export const deleteUserChannels = (channel) => {
  return request({
    url: `/v1_0/user/channels/${channel.id}`,
    method: "DELETE",
  });
};
