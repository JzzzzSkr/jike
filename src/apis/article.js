// 封装api接口
import { request } from "@/utils";

// 1. 获取频道列表
export function getChannelAPI() {
  return request({
    url: "/channels",
    method: "GET",
  });
}
