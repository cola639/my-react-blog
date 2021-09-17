import http from "./httpService";

const apiEndpoint = "/articles";

function articleUrl(id) {
  return `${apiEndpoint}/${id}`;
}

function imgUrl(id) {
  return `${apiEndpoint}/img/${id}`;
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

//全部文章
export function getArticles() {
  return http.get(apiEndpoint + "/all");
}

//增加或修改文章
export function saveArticle(article) {
  if (article._id) {
    const body = { ...article };
    delete body._id;
    return http.put(articleUrl(article._id), body);
  }
  delete article._id;
  return http.post(apiEndpoint, article);
}

export function putImg(articleId, url) {
  return http.put(imgUrl(articleId), url);
}

//删除文章
export function deleteArticle(articleId) {
  return http.delete(articleUrl(articleId));
}
