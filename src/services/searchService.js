import http from "./httpService";
import { apiUrl } from "./config.json";

const apiEndpoint = apiUrl + "/articles";

//获取分类
export function searchCategory(query) {
  return http.post(apiEndpoint + "/category", query);
}

//搜索文章
export function searchArticles(query) {
  return http.post(apiEndpoint + "/search", query);
}
