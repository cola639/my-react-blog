import http from "./httpService";

const apiEndpoint = "/likes/";

function articleUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getLikes(articleId) {
  return http.get(articleUrl(articleId));
}

export function postLikes(articleId) {
  return http.post(articleUrl(articleId));
}

//点赞或取消赞
export function putLiked(likes) {
  return http.put(articleUrl(likes.likesId), likes);
}

//删除赞表
export function deleteLikes(articleId) {
  return http.delete(articleUrl(articleId));
}
