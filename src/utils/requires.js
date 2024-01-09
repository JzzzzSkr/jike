// Encapsulation and handling of axios requests
import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";

// 1. Root domain configuration
// 2. Timeout duration
// 3. Request interceptors / Response interceptors

const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// Adding a request interceptor
// Intercept before sending the request, insert some custom configurations [parameter handling]
request.interceptors.request.use(
  (config) => {
    // Modify this 'config' to inject token data
    // 1. Get the token
    // 2. Format the token according to the backend's requirements
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adding a response interceptor
// Intercept before the response is returned to the client, handle the returned data
request.interceptors.response.use(
  (response) => {
    // This function is triggered for status codes within the 2xx range.
    // Do something with the response data
    return response.data;
  },
  (error) => {
    // This function is triggered for status codes outside the 2xx range.
    // Handle response errors here
    // Monitor 401 errors (token expiration)
    console.dir(error);

    if (error.response.status === 401) {
      removeToken();
      router.navigate("/login");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { request };
