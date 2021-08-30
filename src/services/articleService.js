import http from "./httpService";
import { apiUrl } from "./config.json";

const apiEndpoint = apiUrl + "/articles";

function articleUrl(id) {
  return `${apiEndpoint}/${id}`;
}

//第一页文章
export function getFirstList() {
  return http.get(apiEndpoint);
}

//单个文章
export function getArticle(articleId) {
  return http.get(articleUrl(articleId));
}

//加载更多文章
export function getMoreList(pageNumber) {
  return http.post(`${apiEndpoint}/more`, pageNumber);
}

//增加或修改文章
export function saveArticle(article) {
  if (article._id) {
    const body = { ...article };
    delete body._id;
    return http.put(articleUrl(article._id), body);
  }

  return http.post(apiEndpoint, article);
}

// export function putWatchers(articleId) {
//   return http.put(articleUrl(`/watchers/${articleId}`));
// } 放在请求文章里面

//删除文章
export function deleteArticle(articleId) {
  return http.delete(articleUrl(articleId));
}
