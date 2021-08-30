import http from "./httpService"; //面向对象导入,使用http.get
import { apiUrl } from "./config.json";

const apiEndpoint = apiUrl + "/users";
const githubEndpoint = apiUrl + "/github/callback";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getUsers() {
  return http.get(apiEndpoint);
}

export function github(code) {
  return http.post(githubEndpoint, code);
}

export function register(user) {
  return http.post(apiEndpoint, {
    name: user.username,
    password: user.password,
    email: user.email,
  });
}

//增加或修改文章
export function putUser(userId) {
  return http.put(userUrl(userId));
}

export async function deleteUser(userId) {
  return http.delete(userUrl(userId));
}
