import http from "./httpService";

const apiEndpoint = "/comments";

function articleUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getComments(articleId) {
  return http.get(articleUrl(articleId));
}

//增加评论
export function postComment(articleId, reply) {
  return http.post(articleUrl(articleId), reply);
}
