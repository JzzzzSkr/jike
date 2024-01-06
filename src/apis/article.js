// 封装api接口
import { request } from "@/utils";

// 1. 获取频道列表
export function getChannelAPI() {
  return request({
    url: "/channels",
    method: "GET",
  });
}

export function createArticleAPI(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
}

export function getArticleListAPI(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}

export function deleteArticleAPI(articleId) {
  return request({
    url: `/mp/articles/${articleId}`,
    method: "DELETE",
  });
}

// 获取文章详情

export function getArticleById(id) {
  return request({
    url: `/mp/articles/${id}`,
  });
}

// 更新文章表单

export function updateArticleAPI (data) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data
  })
}