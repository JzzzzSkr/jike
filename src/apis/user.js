// 用户相关的请求
import { request } from "@/utils";

export function loginAPI(fromData) {
  // const res = await request.post("/authorizations", fromData);
  return request({
    url: "/authorizations",
    method: "POST",
    data: fromData,
  });
}

export function getUserInfoAPI() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}
