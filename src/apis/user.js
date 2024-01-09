import { request } from "@/utils";

// Authenticate and log in the user
export function loginAPI(formData) {
  return request({
    url: "/authorizations",
    method: "POST",
    data: formData,
  });
}

// Fetch user information
export function getUserInfoAPI() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}
