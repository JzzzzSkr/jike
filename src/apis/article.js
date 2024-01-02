// 封装api接口
import { request } from "@/utils";

export function loginAPI(fromData) {
  // const res = await request.post("/authorizations", fromData);
  return request({
    url: "/authorizations",
    method: "POST",
    data: fromData,
  });
}
