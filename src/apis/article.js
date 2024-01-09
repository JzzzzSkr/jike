import { request } from "@/utils";

// Fetch the list of channels
export function getChannelAPI() {
  return request({
    url: "/channels",
    method: "GET",
  });
}

// Create a new article
export function createArticleAPI(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
}

// Get a list of articles with optional parameters
export function getArticleListAPI(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}

// Delete an article by its ID
export function deleteArticleAPI(articleId) {
  return request({
    url: `/mp/articles/${articleId}`,
    method: "DELETE",
  });
}

// Get an article by its ID
export function getArticleById(id) {
  return request({
    url: `/mp/articles/${id}`,
  });
}

// Update an article by its ID
export function updateArticleAPI(data) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data
  });
}
