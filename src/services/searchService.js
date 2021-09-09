import http from "./httpService";

const apiEndpoint = "/articles";

//获取分类
export function searchCategory(category) {
  return http.get(apiEndpoint + "/category/" + category);
}

//搜索文章
export function searchArticles(name) {
  return http.get(apiEndpoint + `/search?name=${name}`);
}
